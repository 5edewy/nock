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
export let paymentUrl = 'https://nockapp.net/' + I18n.local + '/pay/'
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
    paymentUrl = 'https://nockapp.net/' + lang + '/pay/'
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


export function addCart(item, cart) {
    const check = cart.filter((product) => product.id == item.id)
    if (check && check.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == item.id) {
                cart[i].qty = Number(item.qty) + Number(1)
            }
        }
    } else {
        item.qty = 1

        item.product_id = item.id
        cart.push(item)
    }
    return cart
}
export function updateCart(item, cart, oper) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == item.id) {
            if (oper == "plus") {
                cart[i].qty = Number(item.qty) + Number(1)
            } else if (oper == "minus" && cart[i].qty != 1) {
                cart[i].qty = Number(item.qty) - Number(1)
            } else if (oper == "remove" || cart[i].qty == 1) {
                cart.splice(i, 1)
            }

        }
    }
    return cart
}


