/* These are regular expressions that define patterns for validating different types of input values. */
/* `const usernameRegex = /^[a-zA-Z0-9_]+$/;` is defining a regular expression pattern that matches a
string that contains only alphanumeric characters (both uppercase and lowercase) and underscores.
The `^` and `$` characters indicate the start and end of the string, respectively, and the `+`
character indicates that the pattern should match one or more of the preceding characters. */
const usernameRegex = /^[a-zA-Z0-9_]+$/;
/* `const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;` is defining a regular expression
pattern that matches a string that contains at least one letter and one digit, and is at least 8
characters long. The `^` and `$` characters indicate the start and end of the string, respectively.
The `(?=.*[A-Za-z])` and `(?=.*\d)` are positive lookahead assertions that ensure the string
contains at least one letter and one digit, respectively. The `[A-Za-z\d]{8,}` matches any
combination of letters and digits that is at least 8 characters long. */
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
/* `const numberRegex = /^\d+$/;` is defining a regular expression pattern that matches a string that
contains only digits (0-9). The `^` and `$` characters indicate the start and end of the string,
respectively, and the `\d` character class matches any digit. The `+` character indicates that the
pattern should match one or more of the preceding characters. */
const numberRegex = /^\d+$/;
/* `const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;` is defining a regular expression pattern that
matches a string that contains a valid Gmail email address. The `^` and `$` characters indicate the
start and end of the string, respectively. The `[a-zA-Z0-9._%+-]+` matches one or more of the
characters inside the square brackets, which include letters (both uppercase and lowercase), digits,
and some special characters like period, underscore, percent, plus, and hyphen. The `@gmail\.com`
matches the literal string "@gmail.com". */
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const checkUsername = (stringValue) => {
    const isUsername = usernameRegex.test(stringValue);
    return isUsername;
}

const checkPassword = (stringValue) => {
    const isPassword = passwordRegex.test(stringValue);
    return isPassword;
}

const checkNumber = (stringValue) => {
    const isNumber = numberRegex.test(stringValue);
    return isNumber;
}

const checkPhoneNumber = (stringValue) => {
    const isNumber = numberRegex.test(stringValue);
    return isNumber.length === 10 && isNumber;
}

const checkGmail = (stringValue) => {
    const isGmail = gmailRegex.test(stringValue);
    return isGmail;
}



module.exports = {
    checkNumber,
    checkPhoneNumber,
    checkUsername,
    checkPassword,
    checkGmail
}