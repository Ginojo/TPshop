(function ($) {
    'use strict';

    // Initialize all contact forms
    $('.contact_form').each(function() {
        var form = $(this);
        var message = form.find('.contact__msg');

        // If no message element exists, create one
        if (message.length === 0) {
            form.prepend('<div class="contact__msg alert" role="alert" style="display: none;"></div>');
            message = form.find('.contact__msg');
        }

        // Remove the old action attribute and method
        form.removeAttr('action');
        form.removeAttr('method');

        // Handle form submission
        form.on('submit', function(e) {
            e.preventDefault();

            // Collect form data
            var formData = {};
            form.find('input, textarea, select').each(function() {
                var field = $(this);
                var name = field.attr('name');
                var value = field.val();

                if (name && value) {
                    // Handle different field names in different languages
                    var fieldLabel = name;
                    if (name === 'name' || name === 'naam') {
                        fieldLabel = 'Name/Naam';
                    } else if (name === 'email' || name === 'e-mail') {
                        fieldLabel = 'Email';
                    } else if (name === 'subject' || name === 'onderwerp') {
                        fieldLabel = 'Subject/Onderwerp';
                    } else if (name === 'message' || name === 'bericht') {
                        fieldLabel = 'Message/Bericht';
                    } else if (name === 'phone' || name === 'telefoon') {
                        fieldLabel = 'Phone/Telefoon';
                    }

                    formData[fieldLabel] = value;
                }
            });

            // Create email content
            var emailTo = 'ginoludik@gmail.com';
            var subject = formData['Subject/Onderwerp'] || 'Contact Form Submission from TPshop Website';
            var body = 'New contact form submission from your website:\n\n';

            for (var key in formData) {
                if (key !== 'Subject/Onderwerp') {
                    body += key + ': ' + formData[key] + '\n';
                }
            }

            // Create mailto link
            var mailtoLink = 'mailto:' + emailTo +
                            '?subject=' + encodeURIComponent(subject) +
                            '&body=' + encodeURIComponent(body);

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            message.removeClass('alert-danger').addClass('alert-success');
            message.html('<strong>Thank you! / Bedankt!</strong> Your email client should now open with your message. / Uw e-mailclient zou nu moeten openen met uw bericht.');
            message.fadeIn();

            // Clear form after a delay
            setTimeout(function() {
                form.find('input:not([type="submit"]), textarea, select').val('');
                message.fadeOut();
            }, 5000);
        });
    });

})(jQuery);