var stripe = Stripe('pk_test_9Pe4K2yIgEEsuNcATvXiH78600vPkb2ERJ');

var elements = stripe.elements();

// Opmaak / Styling
var style = {
    base: {
        padding: '10px 12px',
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        },
    },
    invalid: {
        color: '#fa755a',
    }
};


// De button krijgt een class.
document.querySelector('#payment-form button').classList ='btn btn-primary btn-block mt-4';


// iDeal instellingen
var idealBank = elements.create('idealBank', {style: style});
idealBank.mount('#ideal-bank-element');

var errorMessage = document.getElementById('error-message');

// Form submits
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Set de type, bedrag in centen, dus 10 euro en haalt de naam op uit het formulier.
    var sourceData = {
        type: 'ideal',
        amount: 1000,
        currency: 'eur',
        owner: {
            name: document.querySelector('input[name="voor_naam"]').value,
        },
        // De url waar de klant heen gaat na de betaling
        redirect: {
            return_url: 'https://www.bjornjanzen.nl/charge',
        },
    };


    stripe.createSource(idealBank, sourceData).then(function(result) {
        if (result.error) {
            // Geeft een error als er iets fout is gegaan
            errorMessage.textContent = result.error.message;
            errorMessage.classList.add('visible');

        } else {
            errorMessage.classList.remove('visible');
            stripeSourceHandler(result.source);
        }
    });
});

function stripeSourceHandler(source) {
    // Redirect de bezoeker naar de URL
    document.location.href = source.redirect.url;
}