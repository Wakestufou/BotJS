/**
 * 
 * @param {String} string 
 * @param {String} prefix 
 * @param {*} logfnc 
 * @param {String} color
 */
const write = (string, prefix, logfnc, color = "\x1b[37m") => {
    const date = new Date().toLocaleString();
    const pref = "[" + date + "]" + color + "[" + prefix + "] ";

    for (let line of string.toString().split('\n')){
        logfnc(pref + line + "\x1b[37m");
    };
};

module.exports = {
    info: (message, prefix = "INFO!") => {
        write(message, prefix, console.log);
    },
    warn: (message, prefix = "WARN!") => {
        write(message, prefix, console.warn);
    },
    error: (message, error, prefix = "ERROR", color = "\x1b[31m") => {
        write(message, prefix, console.error, color);
        if (error != undefined) write(error.stack, prefix, console.error, color);
    },
    fatal: (message, error, code, prefix = "FATAL") => {
        write(message, prefix, console.error);
        if (error != undefined) write(error.stack, prefix, console.error);
        process.exit(code !== undefined ? code : -1);
    }
};