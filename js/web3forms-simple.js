$(document).ready(function() {
    console.log('Web3Forms Simple loaded');

    // Initialize all contact forms
    $('.contact_form').each(function() {
        var form = $(this);

        // Remove any action to prevent default submission
        form.removeAttr('action');
        form.removeAttr('method');

        // Add message area if not exists
        if (form.find('.contact__msg').length === 0) {
            form.prepend('<div class="contact__msg alert" role="alert" style="display: none;"></div>');
        }

        // Handle form submission
        form.on('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            var message = form.find('.contact__msg');
            var submitBtn = form.find('input[type="submit"]');
            var originalText = submitBtn.val();

            // Disable submit button
            submitBtn.prop('disabled', true);
            submitBtn.val('Verzenden...');

            // Create form data
            const formData = new FormData();

            // Add access key (REQUIRED)
            formData.append("access_key", "a8e4594c-c2b2-48e0-a8d7-46990a8b0b75");

            // Get form values and add to formData
            var naam = form.find('[name="name"], [name="naam"]').val() || '';
            var email = form.find('[name="email"]').val() || '';
            var onderwerp = form.find('[name="subject"], [name="onderwerp"]').val() || '';
            var bericht = form.find('[name="message"], [name="bericht"]').val() || '';
            var telefoon = form.find('[name="phone"], [name="telefoon"]').val() || '';

            // Add fields with correct names
            if (naam) formData.append("name", naam);
            if (email) formData.append("email", email);
            if (onderwerp) formData.append("subject", onderwerp);
            if (bericht) formData.append("message", bericht);
            if (telefoon) formData.append("phone", telefoon);

            // If no subject, add default
            if (!onderwerp) {
                formData.append("subject", "Contact Form Submission from TPshop");
            }

            console.log('Sending to Web3Forms...');

            // Send to Web3Forms
            $.ajax({
                url: "https://api.web3forms.com/submit",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log('Success:', response);

                    // Show success message
                    message.removeClass('alert-danger').addClass('alert-success');
                    message.html('<strong>Bedankt!</strong> Uw bericht is verzonden. We nemen zo snel mogelijk contact met u op.');
                    message.fadeIn();

                    // Clear form
                    form.find('input:not([type="submit"]), textarea').val('');

                    // Reset button
                    submitBtn.prop('disabled', false);
                    submitBtn.val(originalText);

                    // Hide message after 5 seconds
                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    console.error('Response:', xhr.responseText);

                    // Show error message
                    message.removeClass('alert-success').addClass('alert-danger');
                    message.html('<strong>Error:</strong> Er is iets misgegaan. Probeer het opnieuw.');
                    message.fadeIn();

                    // Reset button
                    submitBtn.prop('disabled', false);
                    submitBtn.val(originalText);

                    setTimeout(function() {
                        message.fadeOut();
                    }, 5000);
                }
            });
        });
    });
});