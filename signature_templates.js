document.addEventListener('DOMContentLoaded', function() {
    function updatePreview() {
        const name = document.getElementById('name').value || 'John Doe';
        const title = document.getElementById('title').value || 'Software Engineer';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const campaignName = document.getElementById('campaignName').value || 'Summer Sale!';
        const campaignDescription = document.getElementById('campaignDescription').value || 'Sale! Sale!';
        const campaignStartDate = document.getElementById('campaignStartDate').value || 'Start Date';
        const campaignEndDate = document.getElementById('campaignEndDate').value || 'End Date';
        let campaignLink = document.getElementById('campaignLink').value || '#';
        const template = document.getElementById('templateSelect').value;
        const facebook = document.getElementById('facebook').value || '';
        const instagram = document.getElementById('instagram').value || '';
        const twitter = document.getElementById('twitter').value || '';
        const linkedin = document.getElementById('linkedin').value || '';

        // UTM parameters
        const utmSource = document.getElementById('utm_source').value || 'email';
        const utmMedium = document.getElementById('utm_medium').value || 'signature';
        const utmCampaign = document.getElementById('utm_campaign').value || campaignName;
        
        // Construct UTM string
        const utmParams = `?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
        
        // Append UTM parameters to the campaign link
        if (campaignLink !== '#') {
            campaignLink += utmParams;
        }

        const companyPhone = document.getElementById('companyPhone').value || '(012) 345 6789';
        const companyAddress = document.getElementById('companyAddress').value || '123 Main Street, City, Suite';

        renderTemplate(template, pfpUrl, name, title, phone, campaignName, campaignDescription, campaignStartDate, campaignEndDate, 
            campaignLink, logoImageUrl, campaignImageUrl, facebook, instagram, twitter, linkedin, companyPhone, companyAddress, utmParams);
    }

        function renderTemplate(template, pfpUrl, name, title, phone, campaignName, campaignDescription, campaignStartDate, campaignEndDate, campaignLink, 
        logoImageUrl, campaignImageUrl, facebook, instagram, twitter, linkedin, companyPhone, companyAddress, utmParams) {

        const preview = document.getElementById('preview');
        let htmlContent = '';

        // Add UTM parameters to social links
        const facebookLink = facebook ? `${facebook}${utmParams}` : '';
        const instagramLink = instagram ? `${instagram}${utmParams}` : '';
        const twitterLink = twitter ? `${twitter}${utmParams}` : '';
        const linkedinLink = linkedin ? `${linkedin}${utmParams}` : '';

        // Uploading images to imgur so they can be read
        async function uploadImageToImgur(file) {
        const formData = new FormData();
        formData.append('image', file);
    
        const maxRetries = 3; // Number of retries for upload
        let attempts = 0;
    
        while (attempts < maxRetries) {
            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    'Authorization': '0751495857ee1de' 
                },
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.success) {
                return data.data.link; // Return the uploaded image URL
            } else if (data.data.error === "Too Many Requests") {
                attempts++;
                console.log(`Attempt ${attempts}: Too many requests. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            } else {
                throw new Error(`Image upload failed: ${data.data.error}`);
            }
        }
    
        throw new Error('Max retries reached. Image upload failed.');
    }
    
    // Track image URLs
    let logoUrl = '';
    let campaignImageUrl = '';
    let pfpUrl = '';
    
    // Function to update the signature preview
    function updateSignature() {
        const signatureHtml = `
            <div>
                <img src="${logoUrl}" alt="Logo" style="max-width: 100px;"/>
                <img src="${campaignImageUrl}" alt="Campaign Image" style="max-width: 100px;"/>
                <img src="${pfpUrl}" alt="Profile Picture" style="max-width: 100px;"/>
            </div>
        `;
        document.getElementById('signature-preview').innerHTML = signatureHtml; // Update the live preview
    }
    
    // Event listener for image uploads
    document.getElementById('signature-form').addEventListener('change', async (event) => {
        event.preventDefault();
        const input = event.target;
        if (input.files && input.files[0]) {
            try {
                const imageUrl = await uploadImageToImgur(input.files[0]);
    
                // Update the respective image URL in your signature
                if (input.id === 'logoUpload') {
                    logoUrl = imageUrl; // Update logo image URL
                } else if (input.id === 'campaignImage') {
                    campaignImageUrl = imageUrl; // Update campaign image URL
                } else if (input.id === 'pfp') {
                    pfpUrl = imageUrl; // Update profile picture URL
                }
    
                // Update the live preview with the new URLs
                updateSignature();
            } catch (error) {
                console.error(error);
            }
        }
    });
            
        switch(template) {
            case '1':
                htmlContent = `
                <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                        <tr>
                            <td style="text-align: center; padding: 10px;">
                                <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right; padding: 10px;">
                                <strong>${name}</strong><br/>
                                ${title}<br/>
                                ${phone}<br/>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">
                                <strong>${campaignName}</strong><br/>
                                ${campaignDescription}<br/>
                                Dates: ${campaignStartDate} - ${campaignEndDate}<br/>
                                <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding: 10px;">
                                <a href="${campaignLink}" target="_blank">
                                    <img src="${campaignImageUrl}" alt="Campaign Image" style="max-width: 100%; height: auto;">
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 10px;">
                                ${facebook ? `<a href="${facebookLink}" style="color: #004d00;">Facebook</a> | ` : ''} 
                                ${instagram ? `<a href="${instagramLink}" style="color: #004d00;">Instagram</a> | ` : ''} 
                                ${twitter ? `<a href="${twitterLink}" style="color: #004d00;">Twitter</a> | ` : ''} 
                                ${linkedin ? `<a href="${linkedinLink}" style="color: #004d00;">LinkedIn</a>` : ''}<br/>
                                ${companyPhone}<br/>
                                ${companyAddress}<br/>
                                TARPO
                            </td>
                        </tr>
                    </table>
                `;
                break;

                case '2':
                    htmlContent = `
                    <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 600px; margin: auto;">
                            <tr>
                                <td style="text-align: center; margin-bottom: 10px;">
                                    <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: right; margin-bottom: 20px;">
                                    <strong>${name}</strong><br/>
                                    ${title}<br/>
                                    ${phone}<br/>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; margin: 10px 0;">
                                    <strong>${campaignName}</strong><br/>
                                    ${campaignDescription}<br/>
                                    Dates: ${campaignStartDate} - ${campaignEndDate}<br/>
                                    <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 2px solid #5bbc5c; padding-top: 10px; text-align: center;">
                                    <div style="font-size: 16px;">
                                        ${facebook ? `<a href="${facebookLink}" style="color: #004d00;" target="_blank">Facebook</a> |` : ''} 
                                        ${instagram ? `<a href="${instagramLink}" style="color: #004d00;" target="_blank">Instagram</a> |` : ''} 
                                        ${twitter ? `<a href="${twitterLink}" style="color: #004d00;" target="_blank">Twitter</a> |` : ''} 
                                        ${linkedin ? `<a href="${linkedinLink}" style="color: #004d00;" target="_blank">LinkedIn</a>` : ''}<br/>
                                        ${companyPhone}<br/>
                                        ${companyAddress}<br/>
                                        TARPO
                                    </div>
                                </td>
                            </tr>
                        </table>
                    `;
                    break;

                    case '3':
                    htmlContent = `
                    <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 600px; margin: auto;">
                            <tr>
                                <td style="text-align: center; margin-top: 10px;">
                                    <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                                </td>
                            </tr>
                            <tr>
                                <td style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <div style="flex: 1;">
                                        <strong>${name}</strong><br/>
                                        ${title}<br/>
                                        ${phone}<br/>
                                    </div>
                                    <div style="text-align: right;">
                                        <strong>${campaignName}</strong><br/>
                                        <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                    <a href="${campaignLink}" target="_blank">
                                        <img src="${campaignImageUrl}" alt="Campaign Image" style="width: 100%; max-height: 150px; object-fit: cover; margin-top: 10px;">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 2px solid #5bbc5c; padding-top: 10px; text-align: center;">
                                    <div style="font-size: 16px;">
                                        ${facebook ? `<a href="${facebookLink}" target="_blank" style="color: #004d00;">Facebook</a> | ` : ''}
                                        ${instagram ? `<a href="${instagramLink}" target="_blank" style="color: #004d00;">Instagram</a> | ` : ''}
                                        ${twitter ? `<a href="${twitterLink}" target="_blank" style="color: #004d00;">Twitter</a> | ` : ''}
                                        ${linkedin ? `<a href="${linkedinLink}" target="_blank" style="color: #004d00;">LinkedIn</a>` : ''}<br/>
                                        ${companyPhone}<br/>
                                        ${companyAddress}<br/>
                                        TARPO
                                    </div>
                                </td>
                            </tr>
                        </table>
                    `;
                    break;

                    case '4':
                        htmlContent = `
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 600px; margin: auto;">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 10px;">
                                        <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="flex: 1; padding-right: 10px;">
                                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                                <img src="${pfpUrl}" alt="Profile Picture" style="height: 50px; border-radius: 50%; margin-right: 10px;">
                                                <div style="text-align: left;">
                                                    <strong>${name}</strong><br/>
                                                    ${title}<br/>
                                                    ${phone}<br/>
                                                </div>
                                            </div>
                                            <div style="text-align: left;">
                                                <strong>${campaignName}</strong><br/>
                                                ${campaignDescription}<br/>
                                                Dates: ${campaignStartDate} - ${campaignEndDate}<br/>
                                                <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
                                            </div>
                                        </div>
                                        <div style="flex: 0 0 auto; text-align: right;">
                                            <a href="${campaignLink}" target="_blank">
                                                <img src="${campaignImageUrl}" alt="Campaign Image" style="height: 150px; object-fit: cover;">
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-top: 2px solid #5bbc5c; padding-top: 10px; text-align: center;">
                                        <div style="font-size: 16px;">
                                            ${facebook ? `<a href="${facebookLink}" style="color: #004d00;" target="_blank">Facebook</a> | ` : ''} 
                                            ${instagram ? `<a href="${instagramLink}" style="color: #004d00;" target="_blank">Instagram</a> | ` : ''}
                                            ${twitter ? `<a href="${twitterLink}" style="color: #004d00;" target="_blank">Twitter</a> | ` : ''}
                                            ${linkedin ? `<a href="${linkedinLink}" style="color: #004d00;" target="_blank">LinkedIn</a>` : ''}<br/>
                                            ${companyPhone}<br/>
                                            ${companyAddress}<br/>
                                            TARPO
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        `;
                        break;

                        case '5':
                        htmlContent = `
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 600px; margin: auto;">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 10px;">
                                        <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                                        <img src="${pfpUrl}" alt="Profile Picture" style="height: 50px; border-radius: 50%; margin-right: 10px;">
                                        <div style="text-align: center;">
                                            <strong>${name}</strong><br/>
                                            ${title}<br/>
                                            ${phone}<br/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; margin-bottom: 20px;">
                                        <a href="${campaignLink}" target="_blank">
                                            <img src="${campaignImageUrl}" alt="Campaign Image" style="width: 100%; max-height: 150px; object-fit: cover;">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-top: 2px solid #5bbc5c; padding-top: 10px; text-align: center;">
                                        <div style="font-size: 16px;">
                                            ${facebook ? `<a href="${facebookLink}" style="color: #004d00;" target="_blank">Facebook</a>  |` : ''} 
                                            ${instagram ? `<a href="${instagramLink}" style="color: #004d00;" target="_blank">Instagram</a> |` : ''}
                                            ${twitter ? `<a href="${twitterLink}" style="color: #004d00;" target="_blank">Twitter</a> |` : ''}
                                            ${linkedin ? `<a href="${linkedinLink}" style="color: #004d00;" target="_blank">LinkedIn</a>` : ''}<br/>
                                            ${companyPhone}<br/>
                                            ${companyAddress}<br/>
                                            TARPO
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        `;
                        break;

                        case '6':
                        htmlContent = `
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; max-width: 600px; margin: auto;">
                                <tr>
                                    <td style="text-align: center;">
                                        <img src="${logoImageUrl}" alt="Logo" style="height: 50px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; margin-top: 10px;">
                                        <div style="flex: 1;">
                                            <strong>${name}</strong><br/>
                                            ${title}<br/>
                                            ${phone}<br/>
                                            <br/>
                                            <strong>${campaignName}</strong><br/>
                                            ${campaignDescription}<br/>
                                            Dates: ${campaignStartDate} - ${campaignEndDate}<br/>
                                            <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
                                        </div>
                                        <div style="flex: 1; text-align: right;">
                                            <a href="${campaignLink}" target="_blank">
                                                <img src="${campaignImageUrl}" alt="Campaign Image" style="max-height: 150px; max-width: 50px; object-fit: cover;">
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-top: 2px solid #5bbc5c; padding-top: 10px; text-align: center;">
                                        <div style="font-size: 16px;">
                                            ${facebook ? `<a href="${facebookLink}" style="color: #004d00;" target="_blank">Facebook</a> | ` : ''} 
                                            ${instagram ? `<a href="${instagramLink}" style="color: #004d00;" target="_blank">Instagram</a> | ` : ''}
                                            ${twitter ? `<a href="${twitterLink}" style="color: #004d00;" target="_blank">Twitter</a> | ` : ''}
                                            ${linkedin ? `<a href="${linkedinLink}" style="color: #004d00;" target="_blank">LinkedIn</a>` : ''}<br/>
                                            ${companyPhone}<br/>
                                            ${companyAddress}<br/>
                                            TARPO
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        `;
                        break;
        }

        preview.innerHTML = htmlContent;
    }

    // Event listeners for input fields
    document.getElementById('signature-form').addEventListener('input', updatePreview);
    

    // Initial preview update
    updatePreview();
});

function copyToClipboard() {
    const preview = document.getElementById('preview');
    const range = document.createRange();
    range.selectNodeContents(preview);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('Signature copied to clipboard! You can paste it into Gmail now.');
}

