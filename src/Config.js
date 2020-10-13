import { encrypt, decrypt } from 'react-native-simple-encryption';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
const keyEncrypt = 'gIYH'

import RNRestart from 'react-native-restart';

import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native'
import I18n, { getLanguages } from 'react-native-i18n';
import { I18nManager } from 'react-native'
I18n.fallbacks = true;

I18n.translations = {
    'en': require('./translations/en.json'),
    'ar': require('./translations/ar.json'),
};
let languageSession = AsyncStorage.getItem('language')
export let language

export let baseUrl = 'https://nockapp.net/' + I18n.local + '/mobile/'
export let paymentUrl = 'https://nockapp.net/ar/payment/'
export const headers = {
    'Accept': 'application/json',
    // 'content-type': 'multipart/form-data',
    'client': '1b8f9cc664b16894442db71dfe9d915147d73253',
    'secret': 'c3084effcb3628cdf05012988b2e5ef6dfe5d888',
}
export function changeLng(lang, flag) {
    AsyncStorage.setItem('language', lang)
    I18n.local = lang
    baseUrl = 'https://nockapp.net/' + lang + '/mobile/'
    if (lang == 'ar') {
        I18nManager.forceRTL(true);
    } else if (lang == 'en') {
        I18nManager.forceRTL(false);
    }

    // I18n.local = lang
    if (flag) {
        RNRestart.Restart()
    }

}

export function L(key) {
    let word = I18n.t(key, { locale: I18n.local })
    // let word = I18n.t(key, { locale: 'ar' })
    return word
}
export function joinArrayObjs(arr) {
    var str = '';
    for (var i = 0, len = arr.length; i < len; i++) {
        const element = arr[i]
        let account
        account = element.account.toString()

        str += element.media_name + ',' + element.account.toString() + ':';
    }
    // console.log(str, encrypt(keyEncrypt, str));
    return str/*encrypt(keyEncrypt, str)*/;
}
export function convertArrayObjs(string) {
    // console.log(string)
    // string = decrypt(keyEncrypt, string);
    console.log(string);
    let arr = [], arr1 = []
    arr1 = string.split(":")
    arr1.forEach(element => {
        if (element) {
            const item = element.split(",")
            if (item.length > 1 && item[0] && item[1])
                arr.push({ media_name: item[0], account: item[1] })
        }
    });

    return decrypt(keyEncrypt, arr);
}
export function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
}
export function byteToString(bytes) {
    if (!Array.isArray(bytes) || !bytes.length) return '';

    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
}