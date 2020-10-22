'use strict';
import { StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const Light = 'Poppins-Light'
const Regular = 'Poppins-Regular'
const Medium = 'Poppins-Medium'
const Semi = 'Poppins-SemiBold'
const Bold = 'Poppins-Bold'

const DarkPri = '#1e1e1d'


const styles = StyleSheet.create({
    //General Styles 
    row_aliCentre: {
        flexDirection: 'row', alignItems: 'center'
    },
    row_aliCentre_jusCentre: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    semiBoldDarkText: {
        fontFamily: Semi, fontSize: wp(4), color: DarkPri
    },
    regDarlText: {
        fontFamily: Regular, fontSize: wp(3.6), color: DarkPri
    },
    medDarkText: {
        fontFamily: Medium, color: DarkPri, fontSize: wp(3.6), textAlign: 'center'
    },
    lightDarkText: {
        fontFamily: Light, fontSize: wp(3.2), color: DarkPri
    },
    midWhiteTextForMainButton: {
        fontFamily: Medium, color: '#fff', fontSize: wp(4.3)
    },
    regWhiteText: {
        fontFamily: Regular, color: '#fff', fontSize: wp(3.2)
    },
    boldDarkText: {
        fontFamily: Bold, color: DarkPri, fontSize: wp(4)
    },
    View90: {
        width: wp(90), alignSelf: 'center'
    },
    InputoutView: {
        height: hp(8), borderRadius: wp(2),
        backgroundColor: '#f8f8f8', justifyContent: 'center', paddingHorizontal: wp(1),
        marginTop: hp(2)
    },
    inputStyle: {
        fontFamily: Light, fontSize: wp(3.2), height: hp(7)
    },
    mainDarkButton: {
        width: wp(90), backgroundColor: DarkPri, height: hp(7.5), borderRadius: wp(6),
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    },
    rowAlignsentre: {
        flexDirection: 'row', alignItems: 'center'
    },
    header: {
        flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
        paddingHorizontal: wp(3), marginTop: hp(6)
    },
    // SignIn & Sign Up
    inputWithLabelForget: {
        height: hp(8), borderRadius: wp(2),
        backgroundColor: '#f8f8f8', justifyContent: 'center', paddingHorizontal: wp(1),
        marginTop: hp(2), alignItems: 'center', flexDirection: 'row', paddingRight: wp(6)
    },
    selectBox: {
        width: wp(6), height: wp(6), borderRadius: wp(1.5),
        borderWidth: 1, borderColor: '#e1e1e1', marginHorizontal: wp(2), alignItems: 'center',
        justifyContent: 'center'
    },
    selectDot: {
        width: wp(3), height: wp(3), backgroundColor: '#1e1e1d', borderRadius: wp(.5)
    },
    // Home

    SideMenuIcon: {
        width: wp(9), height: hp(3.5), resizeMode: 'contain'
    },
    personalImage: {
        width: wp(15), height: wp(15), borderRadius: wp(15 / 2), resizeMode: 'cover'
    },
    blackViewForHome: {
        height: hp(20),
        backgroundColor: '#1e1e1d',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: wp(2)
    },
    socialImage: {
        width: wp(18), height: hp(10), resizeMode: 'contain'
    },
    viewForSocialImage: {
        flexDirection: 'row', /*width: wp(62),*/flexWrap: 'wrap',
        /*justifyContent: 'space-around', */marginTop: hp(3)
    },
    addLinkView: {
        width: wp(30), height: hp(5), borderRadius: wp(5), backgroundColor: '#f1f1f1',
        marginTop: hp(4), justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'
    },
    addImage: {
        width: wp(10), height: hp(4.5), resizeMode: 'contain'
    },
    socialImageWithoutLabel: {
        width: wp(17), height: hp(7.5), resizeMode: 'contain'
    },
    regHomeTextOnly: {
        color: '#4d4f51', fontSize: wp(3.2), fontFamily: Regular, marginVertical: hp(1)
    },
    viewInHome: {
        justifyContent: 'center', width: wp(27),
        alignItems: 'center'
    },
    modalViewI: {
        backgroundColor: 'rgba(89, 89, 89,.7)', flex: 1, opacity: .93, justifyContent: 'flex-end'
    },
    modalViewII: {
        backgroundColor: '#fff', borderTopRightRadius: wp(8),
        borderTopLeftRadius: wp(8), paddingTop: hp(2.5)
    },
    modalViewIII: {
        width: wp(90), height: hp(6.5),
        backgroundColor: '#f1f1f1', alignSelf: 'center', borderRadius: wp(6),
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(1)
    },
    imageiconSelect: {
        width: wp(10), height: hp(5), resizeMode: 'contain'
    },
    icondelete: {
        width: wp(4), height: hp(2), resizeMode: 'contain', marginRight: 2
    },

    // Register 
    regViewI: {
        alignSelf: 'center', alignItems: 'center', marginTop: hp(20)
    },
    circImage: {
        width: wp(75), height: hp(45), resizeMode: 'contain'
    },
    regViewII: {
        alignItems: 'center', position: 'absolute', top: hp(16)
    },
    nockDarkImage: {
        width: wp(50), resizeMode: 'contain', height: hp(6)
    },
    // Side Menu 
    lineForImageandName: {
        flexDirection: 'row', marginTop: hp(4), alignItems: 'center',
        alignSelf: 'flex-start', marginLeft: wp(5), alignContent: 'center'
    },
    pageIcon: {
        width: wp(6), height: hp(4), resizeMode: 'contain', marginRight: wp(5)
    },
    sideMenuButton: {
        width: wp(50), height: hp(7), backgroundColor: '#1e1e1d',
        alignSelf: 'center', borderRadius: wp(6), alignItems: 'center', justifyContent: 'center'
    },
    iconInButton: {
        width: wp(8), height: hp(4), resizeMode: 'contain', marginRight: wp(2)
    },
    sidemenuAnimatedView: {
        width: wp(100), height: hp(100), position: 'absolute',
        flexDirection: 'row',
    },
    sideMenuContent: {
        width: wp(70), backgroundColor: '#fff', height: hp(100),
        borderTopRightRadius: wp(8), borderBottomRightRadius: wp(8)
    },
    lineGray: {
        borderWidth: .5, height: .3, borderColor: '#d9d9d9',
        marginTop: hp(2), marginBottom: hp(2), width: wp(60), alignSelf: 'center'
    },
    dairaSwda: {
        width: wp(35), height: wp(35), borderRadius: wp(35 / 2),
        backgroundColor: '#1e1e1d', position: 'absolute', left: -wp(15)
    },
    viewForSideMenu: {
        width: wp(60), alignSelf: 'center',
        marginTop: hp(8), alignItems: 'center', marginBottom: hp(2)
    },

    // Buy Chips Scr

    chipCardI: {
        alignItems: 'center', justifyContent: 'center', width: wp(30),
        paddingHorizontal: wp(1), paddingVertical: hp(2)
    },
    roundedView: {
        width: wp(25), height: hp(5),
        borderWidth: wp(.4), borderColor: '#e0e0e0', borderRadius: wp(5),
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: wp(4)
    },
    verticalLine: {
        width: 1, height: hp(2), borderWidth: 1,
        borderColor: '#e0e0e0', marginHorizontal: wp(1)
    },
    chipImage: {
        width: wp(25), height: hp(16), resizeMode: 'contain'
    },
    //Scan Chips 

    imageBGforScan: {
        width: wp(94), height: hp(60), resizeMode: 'cover',
        alignSelf: 'center', borderRadius: wp(4)
    },
    borderWhiteForScan: {
        position: 'absolute', alignSelf: 'center',
        height: hp(60), width: wp(85), resizeMode: 'contain'
    },
    //Resturatnts  & Menu Screens
    restCard: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: wp(3), paddingHorizontal: wp(2), paddingVertical: hp(.5),
        marginTop: hp(1.5)
    },
    restImage: {
        width: wp(27), height: hp(15), resizeMode: 'contain'
    },
    MenuImageForCard: {
        width: wp(25), height: wp(25),
        borderRadius: wp(25 / 2), resizeMode: 'cover',
    },
    segmentView: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(6), marginHorizontal: wp(2), height: hp(5),
        borderRadius: wp(6), alignItems: 'center', justifyContent: 'center'
    },
    //Food Details 
    plusAndMinusButt: {
        width: wp(7), height: wp(7), borderRadius: wp(1),
        backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center',
    },
    //Payment 

    payCard: {
        width: wp(90), borderWidth: 1, borderRadius: wp(2), paddingVertical: hp(1),
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: wp(3), borderColor: '#e9e9e9', marginTop: hp(2)
    },
    selectPay: {
        width: wp(10), height: wp(10), borderRadius: wp(10 / 2),
        alignItems: 'center', justifyContent: 'center',
    },
    payModalI: {
        backgroundColor: 'rgba(89, 89, 89,.7)', alignItems: 'center',
        justifyContent: 'center', height: hp(100)
    },
    payModalII: {
        width: wp(90), height: hp(35), backgroundColor: '#fff'
        , borderRadius: wp(4),
        alignItems: 'center', justifyContent: 'center'
    },
    successPayImage: {
        width: wp(20), height: hp(13), resizeMode: 'contain'
    },
    //MyProfile
    headerForProfile: {
        backgroundColor: '#000', height: hp(22), borderBottomLeftRadius: wp(14), borderBottomRightRadius: wp(14)
    },
    secheaderProfile: {
        flexDirection: 'row', alignItems: 'center', marginTop: hp(4),
        paddingHorizontal: wp(3), marginTop: hp(6)
    },
    absViewHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(6),
        position: 'absolute', bottom: hp(-5.5), width: wp(100)
    },
    whiteViewImgProfile: {
        width: wp(27), height: wp(27), borderRadius: wp(27 / 2), backgroundColor: '#fff', alignItems: 'center',
        justifyContent: 'center'
    },
    profileIMG: {
        width: wp(24), height: wp(24), borderRadius: wp(24 / 2), resizeMode: 'cover',
    },
    whiteViewforcheck: {
        width: wp(12.5), height: wp(12.5), borderRadius: wp(12.5 / 2), backgroundColor: '#fff', alignItems: 'center',
        justifyContent: 'center'
    },
    blackinnerView: {
        width: wp(11), height: wp(11), borderRadius: wp(11 / 2), backgroundColor: '#000', alignItems: 'center',
        justifyContent: 'center'
    },
    viewForText: {
        alignSelf: 'center', alignItems: 'center', marginTop: hp(6)
    },
    itemForProfile: {
        flexDirection: 'column', alignItems: 'flex-start', paddingVertical: hp(1), marginTop: hp(1)
    },
    passView: {
        flexDirection: 'row', justifyContent: 'space-between', width: wp(88),
        marginTop: hp(1), alignItems: 'center'
    },
    bgCamView: {
        backgroundColor: '#110a0a', width: wp(24), height: wp(24),
        borderRadius: wp(24 / 2), position: 'absolute', zIndex: 1, opacity: .5,
        justifyContent: 'center', alignItems: 'center'
    },
    //my Orders 
    segmentViewOrders: {
        width: wp(27), height: hp(5), borderRadius: wp(6),
        marginHorizontal: wp(1), justifyContent: 'center', alignItems: 'center'
    },
    myOrdersCardView: {
        flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingVertical: hp(.5),
        marginTop: hp(1.5), paddingHorizontal: wp(1)
    },
    CardView: {
        paddingVertical: hp(.5),
        marginTop: hp(1.5), paddingHorizontal: wp(1), borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: hp(2)
    },
    innerCardView: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: hp(1.5), paddingHorizontal: wp(1)
    },
    plusMinusButt: {
        width: wp(7.5), height: wp(6.5), borderRadius: wp(2), backgroundColor: '#000', alignItems: 'center',
        justifyContent: 'center'
    },
    numView: {
        width: wp(11), height: wp(6.5), borderRadius: wp(2), borderWidth: .5, justifyContent: 'center', alignItems: 'center'
    },
    //Conact us

    textAreastyle: {
        fontFamily: Light, fontSize: wp(3.2), backgroundColor: '#f8f8f8', borderRadius: wp(2), marginTop: hp(2),
        paddingTop: hp(2), paddingHorizontal: wp(2)
    },
    //MyAdrees 
    CardAddress: {
        borderRadius: wp(3), paddingVertical: hp(2.5), paddingHorizontal: wp(8), marginTop: hp(2)
    },
    smallcheckbos: {
        width: wp(7), height: hp(3), borderWidth: 1, borderRadius: wp(2), alignItems: 'center',
        justifyContent: 'center', marginRight: wp(2)
    },
    adrrButton: {
        width: wp(55), backgroundColor: DarkPri, height: hp(6.5), borderRadius: wp(4),
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row'
    },
    modalContainerlStyle: {
        position: 'relative',
        left: 0,
        right: 0,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        zIndex: -1,
        flex: 1,
    },
    modalStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 11,
        backgroundColor: '#ffffff',
        padding: 15,
    },

});


export default styles;