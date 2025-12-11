var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var SettingsSchema = new Schema({
    installation: {type: String , default: "timotech"},
    newLayoutsEnable: {type: Boolean , default: false},
    systemMessagesHide: {type: Boolean, default: false},
    forceTvOn: {type: Boolean, default: false},
    disableCECPowerCheck: {type: Boolean, default: false},
    defaultDuration: {type: Number, default: 10},
    language: {type: String , default: 'en'},
    logo: {type: String},
    url: {type: String},
    sshPassword: {type: String, default: null},
    enableLog : {type: Boolean, default: false},
    hideWelcomeNotice: {type: Boolean, default: false},
    reportIntervalMinutes:  {type: Number, default: 5},
    enableYoutubeDl : {type: Boolean, default: true},
    authCredentials: [
            {
                user: {type: String },
                password: {type: String },
                isAdmin: {type: Boolean }
            }
        ],
    playerCredentials: {
            user: {type: String , default: 'digispot'},
            password: {type: String , default: 'digispot'}
        }
}, {
    usePushEach: true
})



mongoose.model('Settings', SettingsSchema)


