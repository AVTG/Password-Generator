const inputSlider = document.querySelector("[data-lengthSlider]") ;

const lengthDisplay = document.querySelector("[data-lengthNumber]") ;

const passwordDisplay = document.querySelector("[data-passwordDisplay]") ;

const copyButton = document.querySelector("[data-copyTo]") ;

const copyMsg = document.querySelector("[data-copyMsg]") ;

const upperCaseCheck = document.querySelector("#uppercase") ;

const lowerCaseCheck = document.querySelector("#lowercase") ;

const numberCheck = document.querySelector("#number") ;

const symbolCheck = document.querySelector("#symbol") ;

const indicator = document.querySelector("[data-indicator]") ;

const generateBtn = document.querySelector(".generateButton") ;

const allCheckBox = document.querySelectorAll("input[type=checkbox]") ;


const symbol = "!@#%^&*()_+{}:<>?/,." ;
const symbolArray = Array.from(symbol);
console.log(symbolArray) ;


let password = "" ;
let passwordLength = 10 ;

let checkCount = 0 ;
//set strength circle grey

handleSlider() ;
//set password length according to slider
function handleSlider(){
    inputSlider.value = passwordLength ;
    lengthDisplay.innerText = passwordLength ;
}


function setIndicator(color){
    indicator.style.backgroundColor = color ;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}` ;

    //shadow ;
}
setIndicator("#ccc");

function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min ;
}

function generateRandomNumber(){
    return getRandomInteger(0,9) ;
}

function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123)) ;
}

function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91)) ;
}

function generateSymbol(){
    const randomNum = getRandomInteger(0 , (symbolArray.length-1)) ;

    return symbolArray[randomNum] ;
} 

function calcStrength(){
    let hasUpper = false ;
    let hasLower = false ;
    let hasNumber = false ;
    let hasSymbol = false ;

    if(upperCaseCheck.checked) hasUpper = true ;
    if(lowerCaseCheck.checked) hasLower = true ;
    if(numberCheck.checked) hasNumber = true ;
    if(symbolCheck.checked) hasSymbol = true ;

    if(hasUpper && hasLower && (hasSymbol || hasNumber) && passwordLength >= 8){
        setIndicator("#0f0")
    }

    else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength>=6){
        setIndicator("#ff0") ;
    }

    else{
        setIndicator("#f00")
    }
}


async function copyContent(){
    try{
        if(password === ""){
            alert ("Generate Password to Copy") ;
        }
        else{
            await navigator.clipboard.writeText(password) ;
            copyMsg.innerText = "Copied" ;
            copyMsg.classList.add("active") ;
            
            setTimeout(() => { 
                copyMsg.classList.remove("active") ;
            }, 2000);
        }
    }

    catch(e){
        alert ('Failed To Copy')
    }

}

inputSlider.addEventListener('input' , (e) => {
    passwordLength = e.target.value ;
    handleSlider() ;
}) ;



copyButton.addEventListener('click' ,copyContent) ;


function handleCheckBoxChange(){
    checkCount = 0 ;

    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++ ;
        }
    }) ;

    //special case
    if(passwordLength < checkCount){
        passwordLength = checkCount ;
    }
    handleSlider() ;
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange) ;
}) ;

function shufflePassword(array){
    // fisher yates method
    for(let i = array.length - 1 ; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i+1)) ;
        const temp = array[i] ;
        array[i] = array[j] ;
        array[j] = temp ;
    }

    let str = "" ;
    str = array.join("") ;

    return str ;


}



function handleGeneratePassword(){
    if(checkCount <= 0){
        alert('Select atleast one Option(s) to Generate Password')  ;
        return ;
    } 


    if(passwordLength < checkCount){
        passwordLength = checkCount ;
    }
    handleSlider() ; 
    
    password = "" ;

    let funcArr = [] ;

    if(upperCaseCheck.checked){
        funcArr.push(generateUppercase) ;
    }

    if(lowerCaseCheck.checked){
        funcArr.push(generateLowercase) ;
    }

    if(numberCheck.checked){
        funcArr.push(generateRandomNumber) ;
    }

    if(symbolCheck.checked){
        funcArr.push(generateSymbol) ;
    }

    for(let i = 0 ; i < funcArr.length ; i ++){
        password += funcArr[i]() ;
    }

    for(let i = 0 ; i < (passwordLength - funcArr.length) ; i++){
        let randomnumber1 = getRandomInteger(0,funcArr.length-1) ;
        password += funcArr[randomnumber1]() ;
    }

    //shuffle password
    //password = shufflePassword(Array.from(password)) ;
    console.log(password) ;

    passwordDisplay.value = password ;
    calcStrength() ;

}

generateBtn.addEventListener('click' , handleGeneratePassword) ;




 

