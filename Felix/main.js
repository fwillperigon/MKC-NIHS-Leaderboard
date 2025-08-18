function UserObject(name, password, power, classcode, year, pfp)
{
    this.name = name;
    this.psasword = password;
    this.power = power;
    this.classcode = classcode;
    this.year = year;
    this.pfp = pfp;
    this.stats = [];
}

const lowercase_test = new RegExp("[a-z]+");
const uppercase_test = new RegExp("[A-Z]+");
const number_test = new RegExp("[0-9]+");
const special_test = new RegExp("[!@#$%^&*?]+");

function main()
{
    //Register();
    Encrypt("hi");
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

    if (!lower)
        return 2;
    else if (!upper)
        return 3;
    else if (!number)
        return 4;
    else if (!special)
        return 5;
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
                alert("Password too short");
                break;
            case 2:
                alert("No lowercase letters");
                break;
            case 3:
                alert("No uppercase letters");
                break;
            case 4:
                alert("No numbers");
                break;
            case 5:
                alert("No special characters");
                break;
            default:
                alert("Valid password!");
                valid_password = true;
                break; 
        }
    }

    // Encrypt password
    
    registeredUser = new UserObject(name, pass, 0, classcode, year, null);
    console.log(registeredUser);
    // add user to database
}

function Encrypt(pass)
{
    const key = "29OJLjvs1y3GstLyhN0UmUgfTpdh/y0xk95ntfjmeBk=";
    const SBox = 
    [
        6, 11, 3, 13,
        2, 0, 8, 1,
        7, 15, 14, 12,
        5, 9, 4, 10
    ];

    var InvSBox = 
    [
        5,7,4,2,
        14,12,0,8,
        6,13,15,1,
        11,3,10,9,
    ];

    var TestScramble = 
    [
        0,1,2,3,
        4,5,6,7,
        8,9,10,11,
        12,13,14,15
    ]

    var TempBox = 
    [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    ];

    for (var j = 0; j < 85; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            TempBox[i] = SBox[TestScramble[i]];
        }
        for (var i = 0; i < 16; i++)
        {
            TestScramble[i] = TempBox[i];
        }
    }

    console.log(TempBox);

    for (var j = 0; j < 85; j++)
    {
        for (var i = 0; i < 16; i++)
        {
            TempBox[i] = SBox[InvSBox[i]];
        }
        for (var i = 0; i < 16; i++)
        {
            TestScramble[i] = TempBox[i];
        }
    }

    console.log(TempBox);
}