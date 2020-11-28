//
//  Nock.swift
//  nock
//
//  Created by Mostafa alal on 28/11/2020.
//

import Foundation
import CoreNFC

typealias NFCReadingCompletion = (Result<NFCNDEFMessage?, Error>) -> Void
typealias LocationReadingCompletion = (Result<Any, Error>) -> Void


enum NFCError: LocalizedError {
  case unavailable
  case invalidated(message: String)
  case invalidPayloadSize

  var errorDescription: String? {
    switch self {
    case .unavailable:
      return "NFC Reader Not Available"
    case let .invalidated(message):
      return message
    case .invalidPayloadSize:
      return "NDEF payload size exceeds the tag limit"
    }
  }
}

@objc(Nock)
class Nock: NSObject, NFCNDEFReaderSessionDelegate {
  func readerSession(_ session: NFCNDEFReaderSession, didInvalidateWithError error: Error) {
    if let error = error as? NFCReaderError,
        error.code != .readerSessionInvalidationErrorFirstNDEFTagRead &&
          error.code != .readerSessionInvalidationErrorUserCanceled {
        completion?(.failure(NFCError.invalidated(message:
          error.localizedDescription)))
      }

      self.session = nil
      completion = nil
  }
  
  func readerSession(_ session: NFCNDEFReaderSession, didDetectNDEFs messages: [NFCNDEFMessage]) {
    
  }
  
  func readerSession(
    _ session: NFCNDEFReaderSession,
    didDetect tags: [NFCNDEFTag]
  ) {
    guard
      let tag = tags.first,
      tags.count == 1
      else {
        session.alertMessage = """
          There are too many tags present. Remove all and then try again.
          """
        DispatchQueue.global().asyncAfter(deadline: .now() + .milliseconds(500)) {
          session.restartPolling()
        }
        return
    }
    
    session.connect(to: tag) { error in
      if let error = error {
        self.handleError(error)
        return
      }

      // 2
      tag.queryNDEFStatus { status, _, error in
        if let error = error {
          self.handleError(error)
          return
        }

        // 3
        switch (status, self.action) {
        case (.notSupported, _):
          session.alertMessage = "Unsupported tag."
          session.invalidate()
        case (.readOnly, _):
          session.alertMessage = "Unable to write to tag."
          session.invalidate()
        case (.readWrite, .setupLocation(let locationName)):
          self.createLocation(name: locationName, with: tag)
        case (.readWrite, .readLocation):
          return
        default:
          return
        }
      }
    }
  }
  
  private func handleError(_ error: Error) {
//    session?.alertMessage = error.localizedDescription
//    session.
    session?.invalidate(errorMessage: error.localizedDescription)
  }
  
  func createLocation(name: String, with tag: NFCNDEFTag) {
      // 1
      guard let payload = NFCNDEFPayload
        .wellKnownTypeURIPayload(string: name)
        else {
          handleError(NFCError.invalidated(message: "Could not create payload"))
          return
      }

      // 2
      let message = NFCNDEFMessage(records: [payload])

      // 3
      tag.writeNDEF(message) { error in
        if let error = error {
          self.handleError(error)
          return
        }

        self.session?.alertMessage = "Your chip is ready to use."
        self.session?.invalidate()
        self.completion?(.success(name))
      }
    }
  
  enum NFCAction {
    case readLocation
    case setupLocation(locationName: String)
    case addVisitor(visitorName: String)

    var alertMessage: String {
      switch self {
      case .readLocation:
        return "Place tag near iPhone to read the location."
      case .setupLocation(let locationName):
        return "Place tag near iPhone to setup your chip"
      case .addVisitor(let visitorName):
        return "Place tag near iPhone to add \(visitorName)"
      }
    }
  }

  private static let shared = Nock()
  private var action: NFCAction = .readLocation
  private var session: NFCNDEFReaderSession?
  private var completion: LocationReadingCompletion?

  // 2
  static func performAction(
    _ action: NFCAction,
    completion: LocationReadingCompletion? = nil
  ) {
    // 3
    guard NFCNDEFReaderSession.readingAvailable else {
      completion?(.failure(NFCError.unavailable))
      print("NFC is not available on this device")
      return
    }

    shared.action = action
    shared.completion = completion
    // 4
    shared.session = NFCNDEFReaderSession(
      delegate: shared.self,
      queue: nil,
      invalidateAfterFirstRead: false)
    // 5
    shared.session?.alertMessage = action.alertMessage
    // 6
    shared.session?.begin()
  }
  
  
  @objc func Write(_ name: String, value: Int){
    
    var url = name
    Nock.performAction(.setupLocation(locationName: url)) { _ in
        url = ""
      }
    }
  
}
