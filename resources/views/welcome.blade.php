@extends('layouts.app')

@section('content')
    <div class="container">
        <!-- Zet de titel van de pagina -->
        <h1 class="my-4 text-center">Betaalsysteem Batavia'90</h1>
        <!-- Maakt het formulier, voornaam, achternaam, email. -->
        <form action="./charge.php" method="post" id="payment-form">
            <div class="form-row">
                <input type="text" name="voor_naam" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="Voornaam">
                <input type="text" name="achter_naam" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="Achternaam">
                <input type="email" name="email" class="form-control mb-3 StripeElement StripeElement--empty" placeholder="Emailadres">
                <!-- iDeal element toevoegen, kiezen tussen banken -->
                <div id="ideal-bank-element" class="form-control">

                </div>

                <!-- Error bericht -->
                <div id="error-message" role="alert"></div>

            </div>
            <!-- Knop/button voor het doorgaan met de betaling. -->
            <button type="submit">Doorgaan naar betaling</button>
        </form>
        <!-- Tekst toevoegen -->
        <p> <br>Dit betaalsysteem is in test modus gemaakt voor de club batavia'90.<br>
            Door dit formulier in te vullen wordt u doorverwezen naar de betaalpagina van Batavia'90.<br>
            Hier kan een test betaling worden aangemaakt, die opgeslagen wordt.
        </p>


    </div>
@endsection
