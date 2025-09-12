function UserObject(name, password, power, classcode, year, pfp)
{
    this.name = name;
    this.password = password;
    this.power = power;
    this.classcode = classcode;
    this.year = year;
    this.pfp = pfp;
    this.stats = [];
}

const lowercase_test = new RegExp("[a-z]+");
const uppercase_test = new RegExp("[A-Z]+");
const number_test = new RegExp("[0-9]+");
const special_test = new RegExp("[! #$%&'()*+,-./:;<=>?@]+");

function main()
{
    Register();
}

function CheckPassword(pass)
{
    var lower = lowercase_test.test(pass);
    var upper = uppercase_test.test(pass);
    var number = number_test.test(pass);
    var special = special_test.test(pass);

    // Return Codes
    // 0: Success
    // 1: Password too short
    // 2: No lowercase letters
    // 3: No uppercase letters
    // 4: No numbers
    // 5: No special characters

    if (pass.length < 6)
        return 1;
    else if (pass.length > 16)
        return 2;

    if (!lower)
        return 3;
    else if (!upper)
        return 4;
    else if (!number)
        return 5;
    else if (!special)
        return 6;
    else
        return 0;
}

function Register()
{
    var name = prompt("What is your name");
    var classcode = prompt("What class are you in");
    var year = prompt("What year are you in");

    var valid_password = false;
    var pass;

    while (!valid_password)
    {
        pass = prompt("Input a valid password. Must have\n- Lowercase letters\n- Uppercase letters\n- Numbers\n- Special Characters");
        var passcheck = CheckPassword(pass);
        switch (passcheck)
        {
            case 1:
                alert("Password too short! At least characters");
                break;
            case 2:
                alert("Password too long! Keep within 16 characters");
                break;
            case 3:
                alert("No lowercase letters");
                break;
            case 4:
                alert("No uppercase letters");
                break;
            case 5:
                alert("No numbers");
                break;
            case 6:
                alert("No special characters");
                break;
            default:
                alert("Valid password!");
                valid_password = true;
                break; 
        }
    }

    var encryptedpass = Encrypt(pass);
    registeredUser = new UserObject(name, encryptedpass, 0, classcode, year, null);
}

function Login()
{
    var name = prompt("Input name");
    var pass = prompt("Input password");

    var login_succeed = false;

    while(login_succeed == false)
    {   
        // encrypt entered password to check with account password
        if (Encrypt(pass) == GetUser(name).password)
        {
            login_succeed = true;
            localStorage.setItem("loggedin", "true");
            localStorage.setItem("account", name);
        }
        else
        {
            alert("Incorrect Password. Try Again");
            pass = prompt("Input password");
        }
    }
}

function Encrypt(pass)
{
    const key = "29OJLjvs1y3GstLy";

    var passarray = 
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];

    for (var i = 0; i < pass.length; i++)
    {
        passarray[i] = pass.charCodeAt(i);  // convert password string into ascii code equivalents
    }

    for (var j = 0; j < 10; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            passarray[i] = sbox[passarray[i]];  // substitute characters in the array with corresponding entry in sbox
        }
        shiftRows(passarray);   // shift rows according to AES standard
    }

    for (var i = 0; i < 16; i++)
    {
        passarray[i] = String.fromCharCode(passarray[i]);   // convert ascii characters back into a characters
    }

    var returnpass = passarray.join("");    // turn character array into string
    return returnpass;
}

function Decrypt(pass)
{
    var passarray = 
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];

    for (var i = 0; i < pass.length; i++)
    {
        passarray[i] = pass.charCodeAt(i);  // convert password string into ascii code equivalents
    }

    for (var j = 0; j < 10; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            passarray[i] = invsbox[passarray[i]];   // substitute characters in the array with corresponding entry in inverse sbox
        }
        antiShiftRows(passarray);   // shift rows opposite to AES standard
    }

    for (var i = 0; i < 16; i++)
    {
        if (String.fromCharCode(passarray[i]) != '\x00')
            passarray[i] = String.fromCharCode(passarray[i]);   // if real character, convert to character
        else
            passarray.pop();    // if control character, ignore
    }

    var returnpass = passarray.join("");    // turn character array into string
    return returnpass;
}

function shiftRows(arr)
{
    swapArr(arr, 4, 7);
    swapArr(arr, 4, 6);
    swapArr(arr, 4, 5);

    swapArr(arr, 8, 10);
    swapArr(arr, 9, 11);

    swapArr(arr, 15, 12);
    swapArr(arr, 15, 13);
    swapArr(arr, 15, 14);
}

function antiShiftRows(arr)
{
    swapArr(arr, 4, 5);
    swapArr(arr, 4, 6);
    swapArr(arr, 4, 7);

    swapArr(arr, 8, 10);
    swapArr(arr, 9, 11);

    swapArr(arr, 15, 14);
    swapArr(arr, 15, 13);
    swapArr(arr, 15, 12);
}

function swapArr(arr, a, b)
{
    temp = arr[a];
    arr[a] = arr[b]
    arr[b] = temp;
}

const sbox = 
[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    121, 55, 93, 88, 66, 61, 53, 110, 112, 77, 126, 41, 82, 81, 62, 43, 
    69, 65, 104, 109, 70, 44, 100, 78, 40, 50, 36, 96, 114, 54, 103, 87, 
    115, 102, 111, 116, 52, 107, 117, 80, 37, 120, 39, 106, 101, 123, 68, 
    38, 85, 91, 71, 67, 95, 49, 119, 124, 99, 113, 72, 48, 56, 42, 76, 51, 
    90, 75, 98, 118, 92, 59, 105, 63, 74, 73, 97, 33, 64, 89, 122, 58, 60, 
    57, 34, 125, 108, 46, 84, 79, 86, 45, 83, 35, 94, 47
]

const invsbox = 
[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    108, 115, 124, 59, 73, 80, 75, 57, 44, 94, 48, 54, 122, 118, 126, 92, 
    86, 58, 96, 69, 39, 62, 34, 93, 114, 112, 102, 113, 38, 47, 104, 109, 
    50, 37, 84, 79, 49, 53, 83, 91, 106, 105, 98, 95, 42, 56, 120, 72, 46, 
    45, 123, 119, 81, 121, 64, 36, 110, 97, 82, 101, 35, 125, 85, 60, 107, 
    99, 89, 55, 77, 66, 63, 51, 103, 76, 70, 117, 52, 40, 67, 41, 90, 61, 65,
    68, 71, 100, 87, 74, 33, 111, 78, 88, 116, 43
]