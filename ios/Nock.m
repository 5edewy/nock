//
//  Nock.m
//  nock
//
//  Created by Mostafa alal on 28/11/2020.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(Nock, NSObject)
RCT_EXTERN_METHOD(Write:(NSString*)name value:(NSInteger)value)
@end
