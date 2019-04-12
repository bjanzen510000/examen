var stripe = Stripe('pk_test_9Pe4K2yIgEEsuNcATvXiH78600vPkb2ERJ');

// Na enige tijd stopt de request.
var MAX_POLL_COUNT = 10;
var pollCount = 0;

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

console.log(get('source'));
function pollForSourceStatus() {
    stripe.retrieveSource({id: get('source'), client_secret: get('client_secret')}).then(function(result) {
        var source = result.source;
        console.log(source);
        // Als de status Chargeble is > redirect
        if (source.status === 'chargeable') {
            alert(source.redirect.status);
            $.ajax({
                url: '/new-charge',
                type:'post',
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    // Data van de betaling
                    client_id: source.id,
                    name: source.owner.name,
                    amount: source.amount,
                    currency: source.currency,
                    bank: source.ideal.bank,
                    bic: source.ideal.bic,
                    status: source.status,
                    type: source.type,
                },
                // Als de betaling gelukt is, Geef een melding en redirect de bezoeker naar de homepagina.
                success: function () {
                    alert('Hartelijk dank, uw betaling is geslaagd.');
                    window.location.replace("https://www.bjornjanzen.nl/");

                }
            });
            // Als het niet lukt met betalen, geen een betaling mislukt en stuur de bezoeker terug naar de homepagina.
        } else if (source.status === 'pending' && pollCount < MAX_POLL_COUNT) {
            // probeert te kijken of de status nog steeds `pending`is.
            pollCount += 1;
            setTimeout(pollForSourceStatus, 1000);
        } else {
            // Alert dat betaling is mislukt, wordt doorgestuurd naar de home pagina.
            alert('Uw betaling is mislukt. U wordt doorgestuurd naar de Home Pagina');
            window.location.replace("https://www.bjornjanzen.nl/");
        }
    });
}

pollForSourceStatus();