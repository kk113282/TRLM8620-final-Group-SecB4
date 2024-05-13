import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options)
            stringsJSON = await response.json();
        } catch (err) {
            console.log('Error getting strings', err);
            if (newLocale != "en-US") {
                updateLocale("en-US");
            }
        }
    },
    

    //load resource json based on locale
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    //determine the proper currency format based on locale and return html string
    formatCurrency: (price, color) => {
        let formatted;
        let converted = convertCurrency(price);
        formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted); //$NON-NLS-L$ 
        //return the formatted currency within template literal
        return `<h4>${formatted}</h4>`


    },
    //return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },
   // Format date according to locale
   formatDate: (date) => {
    let options = dateMap[locale] || dateMap['en-US']; // Default to US if locale not set
    return new Intl.DateTimeFormat(locale, options).format(date);
}
}

    
// Currency and date configurations for each locale
var currencyMap = {
    'en-US': 'USD',
    'es-ES': 'EUR',
    'zh-CN': 'CNY',
};

var dateMap = {
    'en-US': { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    'es-ES': { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    'zh-CN': { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
};

// Function to perform rough conversion from USD to target currency
var convertCurrency = (price) => {
    switch (locale) {
        case 'en-US':
            return price; // Assume price is in USD
        case 'es-ES':
            return price * 0.93; // Example conversion rate to EUR
        case 'zh-CN':
            return price * 7; // Example conversion rate to CNY
        default:
            return price;
    }
}

export default i18n;




  

