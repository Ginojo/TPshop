(function ($) {
    'use strict';

    // Server endpoint - change this to your AWS EC2 IP or domain
    const API_ENDPOINT = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api/contact'
        : 'https://tpshop.be/api/contact';

    // Initialize all contact forms
    $('.contact_form').each(function() {
        var form = $(this);
        var message = form.find('.contact__msg');
        var submitBtn = form.find('input[type="submit"]');

        // If no message element exists, create one
        if (message.length === 0) {
            form.prepend('<div class="contact__msg alert" role="alert" style="display: none;"></div>');
            message = form.find('.contact__msg');
        }

        // Remove old action attribute
        form.removeAttr('action');
        form.removeAttr('method');

        // Handle form submission
        form.on('submit', function(e) {
            e.preventDefault();

            // Disable submit button to prevent double submission
            submitBtn.prop('disabled', true);
            submitBtn.val('Sending... / Verzenden...');

            // Collect form data
            var formData = {};
            form.find('input, textarea, select').each(function() {
                var field = $(this);
                var name = field.attr('name');
                var value = field.val();
                if (name && value) {
                    formData[name] = value;
                }
            });

            // Send AJAX request to server
            $.ajax({
                url: API_ENDPOINT,
                type: 'POST',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(response) {
                    // Show success message
                    message.removeClass('alert-danger').addClass('alert-success');
                    message.html('<strong>Success!</strong> Your message has been sent. / <strong>Succes!</strong> Uw bericht is verzonden.');
                    message.fadeIn();

                    // Clear form
                    form.find('input:not([type="submit"]), textarea, select').val('');

                    // Reset button
                    submitBtn.prop('disabled', false);
                    submitBtn.val('Bericht Verzenden');

                    // Hide message after 5 seconds
                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                },
                error: function(xhr, status, error) {
                    // Show error message
                    message.removeClass('alert-success').addClass('alert-danger');

                    var errorMsg = 'An error occurred. Please try again. / Er is een fout opgetreden. Probeer het opnieuw.';

                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMsg = xhr.responseJSON.message;
                    }

                    message.html('<strong>Error:</strong> ' + errorMsg);
                    message.fadeIn();

                    // Reset button
                    submitBtn.prop('disabled', false);
                    submitBtn.val('Bericht Verzenden');

                    // Hide message after 5 seconds
                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                }
            });
        });
    });

})(jQuery);