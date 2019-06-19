import {Platform} from 'react-native';
import {Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10} from '../configs/images';
class Globals{
    
    static FONT_Bold = Platform.OS === 'ios' ? 'AmaticSC-Bold' : 'AmaticSCBold';
    static currentLevel=1;
    static aboutUs = 'Mobmaxime is an established Web and Mobile Application Development Company delivering Xamarin, Appcelerator, Native android and iOS applications';
    static FlagsSource = [
        {
            source:Flag1,
            answer:'Algeria',
        },
        {
            source:Flag2,
            answer:'Angola',
        },
        {
            source:Flag3,
            answer:'Benin',
        },
        {
            source:Flag4,
            answer:'Botswana',
        },
        {
            source:Flag5,
            answer:'Burundi',
        },
        {
            source:Flag6,
            answer:'Cameroon',
        },
        {
            source:Flag7,
            answer:'Chad',
        },
        {
            source:Flag8,
            answer:'Comoros',
        },
        {
            source:Flag9,
            answer:'Djibouti',
        },
        {
            source:Flag10,
            answer:'Egypt',
        },
    ];

    static correctFlag(level) 
    {
        var correctFlagValue = Math.floor(Math.random()*(level*3));
        //alert(correctFlagValue)
        return correctFlagValue;
    }

    static shuffleArray(array,level) 
    {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        var arr = []
        while(arr.length < (level * 3 ))
        {
            var r = Math.floor(Math.random()*array.length) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        
        var randomArray = []
        for(let j = 0 ; j < arr.length ; j++){
            randomArray.push(array[arr[j] - 1]);
        }
        //alert(arr);
        //alert(JSON.stringify(randomArray));
        return randomArray;
    }
}
module.exports = Globals;