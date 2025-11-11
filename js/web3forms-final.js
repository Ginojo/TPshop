$(document).ready(function() {
    console.log('Web3Forms Final version loaded');

    // Process each contact form
    $('.contact_form').each(function() {
        var form = $(this);

        // Add hidden access key field to the form
        if (form.find('input[name="access_key"]').length === 0) {
            form.prepend('<input type="hidden" name="access_key" value="d2e9fe83-f0f0-43de-b806-3f427e5fabb9">');
        }

        // Add message area if not exists
        if (form.find('.contact__msg').length === 0) {
            form.prepend('<div class="contact__msg alert" role="alert" style="display: none;"></div>');
        }

        // Update form action
        form.attr('action', 'https://api.web3forms.com/submit');
        form.attr('method', 'POST');

        // Handle form submission
        form.on('submit', function(e) {
            e.preventDefault();
            console.log('Submitting form to Web3Forms...');

            var message = form.find('.contact__msg');
            var submitBtn = form.find('input[type="submit"]');
            var originalText = submitBtn.val();

            // Disable submit button
            submitBtn.prop('disabled', true);
            submitBtn.val('Verzenden...');

            // Use the form's built-in FormData
            var formData = new FormData(this);

            // Log what we're sending
            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Send using fetch API
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from Web3Forms:', data);

                if (data.success) {
                    // Success!
                    message.removeClass('alert-danger').addClass('alert-success');
                    message.html('<strong>Bedankt!</strong> Uw bericht is succesvol verzonden. We nemen binnen 24 uur contact met u op.');
                    message.fadeIn();

                    // Clear form
                    form[0].reset();

                    // Hide message after 5 seconds
                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                } else {
                    // Error from Web3Forms
                    console.error('Web3Forms error:', data);
                    message.removeClass('alert-success').addClass('alert-danger');
                    var errorMsg = data.message || 'Er is iets misgegaan. Probeer het opnieuw.';
                    message.html('<strong>Error:</strong> ' + errorMsg);
                    message.fadeIn();

                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                }

                // Reset button
                submitBtn.prop('disabled', false);
                submitBtn.val(originalText);
            })
            .catch(error => {
                console.error('Network error:', error);
                message.removeClass('alert-success').addClass('alert-danger');
                message.html('<strong>Error:</strong> Netwerkfout. Controleer uw internetverbinding en probeer opnieuw.');
                message.fadeIn();

                // Reset button
                submitBtn.prop('disabled', false);
                submitBtn.val(originalText);

                setTimeout(function() {
                    message.fadeOut();
                }, 5000);
            });
        });
    });

    console.log('Web3Forms initialization complete. Found ' + $('.contact_form').length + ' forms.');
});