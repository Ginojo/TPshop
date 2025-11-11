(function ($) {
    'use strict';

    // Web3Forms Access Key
    const WEB3FORMS_ACCESS_KEY = 'a8e4594c-c2b2-48e0-a8d7-46990a8b0b75';

    // Wait for document ready
    $(document).ready(function() {
        console.log('Web3Forms script loaded');

        // Initialize all contact forms
        $('.contact_form').each(function() {
            var form = $(this);
            var message = form.find('.contact__msg');
            var submitBtn = form.find('input[type="submit"]');

            console.log('Form found:', form);

            // If no message element exists, create one
            if (message.length === 0) {
                form.prepend('<div class="contact__msg alert" role="alert" style="display: none;"></div>');
                message = form.find('.contact__msg');
            }

            // Remove any action attribute
            form.removeAttr('action');
            form.removeAttr('method');

            // Handle form submission
            form.on('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted, preventing default');

                // Disable submit button
                submitBtn.prop('disabled', true);
                var originalText = submitBtn.val();
                submitBtn.val('Verzenden... / Sending...');

                // Collect form data
                const formData = new FormData();

                // IMPORTANT: Add access key
                formData.append("access_key", WEB3FORMS_ACCESS_KEY);

                // IMPORTANT: Add recipient email
                formData.append("to", "ginoludik@gmail.com");

                // Collect all form fields
                form.find('input, textarea, select').each(function() {
                    var field = $(this);
                    var name = field.attr('name');
                    var value = field.val();

                    if (name && value && name !== 'submit') {
                        console.log('Adding field:', name, '=', value);
                        formData.append(name, value);
                    }
                });

                // Add subject if not present
                if (!formData.has('subject')) {
                    formData.append("subject", "Contact Form Submission from TPshop");
                }

                // Disable redirect
                formData.append("redirect", "false");

                // Send to Web3Forms
                console.log('Sending to Web3Forms...');
                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                })
                .then(response => {
                    console.log('Response received:', response);
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);

                    if (data.success) {
                        // Show success message
                        message.removeClass('alert-danger').addClass('alert-success');
                        message.html('<strong>Bedankt! / Thank you!</strong> Uw bericht is verzonden. We nemen binnen 24 uur contact met u op. / Your message has been sent. We will contact you within 24 hours.');
                        message.fadeIn();

                        // Clear form
                        form.find('input:not([type="submit"]), textarea, select').val('');

                        // Hide message after 5 seconds
                        setTimeout(function() {
                            message.fadeOut();
                        }, 5000);
                    } else {
                        // Show error message
                        console.error('Web3Forms error:', data);
                        message.removeClass('alert-success').addClass('alert-danger');
                        var errorMsg = data.message || 'Er is iets misgegaan. Probeer het opnieuw. / Something went wrong. Please try again.';
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
                    // Show error message
                    console.error('Network error:', error);
                    message.removeClass('alert-success').addClass('alert-danger');
                    message.html('<strong>Error:</strong> Er is iets misgegaan. Probeer het opnieuw. / Something went wrong. Please try again.');
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
    });

})(jQuery);