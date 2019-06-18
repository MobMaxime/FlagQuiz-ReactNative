import {Platform} from 'react-native';
import {Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10} from '../configs/images';
class Globals{
    
    static FONT_Bold = Platform.OS === 'ios' ? 'AmaticSC-Bold' : 'AmaticSCBold';
    static currentLevel=1;

    static options1=['Option1','Option2','Option3'];
    static options2=['Option1','Option2','Option3','Option4','Option5','Option6'];
    static options3=['Algeria','Angola','Benin','Botswana','Burkina_Faso','Burundi','C_African_Rep','Cameroon','Cape_Verde'];
    

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
            answer:'Burkina_Faso',
        },
        {
            source:Flag6,
            answer:'Burundi',
        },
        {
            source:Flag7,
            answer:'C_African_Rep',
        },
        {
            source:Flag8,
            answer:'Cameroon',
        },
        {
            source:Flag9,
            answer:'Algeria',
        },
        {
            source:Flag10,
            answer:'Algeria',
        },
    ];

    static correctFlag(level) 
    {
        var correctFlagValue = Math.floor(Math.random()*(level*3))+ 1;
        alert("Hello" + correctFlagValue);
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
            var r = Math.floor(Math.random()*10) + 1;
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