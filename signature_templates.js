document.addEventListener('DOMContentLoaded', function() {
    //store the img urls globally within this scope
    let logo = '';
    let campaignImage = '';
    let profile = '';
    
    // Initialize Cloudinary widget
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'dntkmjmqh',
            uploadPreset: 'email-sig-gen-imgs',
            sources: ['local', 'url', 'camera'],
            multiple: false,
            cropping: true,
            croppingAspectRatio: 1,
            maxFileSize: 2000000, // 2MB
            resourceType: 'image',
            clientAllowedFormats: ['image'], // restrict to images only
            showSkipCropButton: false,
            styles: {
                palette: {
                    window: "#FFFFFF",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0078FF",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#0078FF",
                    action: "#FF620C",
                    inactiveTabIcon: "#0E2F5A",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                }
            }
        },
        (error, result) => {
            if (error) {
                console.error('Upload error:', error);
                alert('There was an error with the upload. Please try again.');
                return;
            }

            if (!result || !result.event) {
                console.error('Invalid upload result:', result);
                return;
            }

            if (result.event === "success") {
                console.log("Upload successful:", result.info.secure_url);
                
                try {
                    // Store the image URL based on which input triggered the upload
                    switch(currentInput) {
                        case 'logoUpload':
                            logo = result.info.secure_url;
                            break;
                        case 'campaignImage':
                            campaignImage = result.info.secure_url;
                            break;
                        case 'pfp':
                            profile = result.info.secure_url;
                            break;
                        default:
                            console.warn('Unknown input type:', currentInput);
                            return;
                    }

                    // Debug
                    console.log('Updated image URLs:', {logo, campaignImage, profile});

                    // Update the preview immediately after upload
                    updatePreview();
                } catch (e) {
                    console.error('Error processing upload result:', e);
                    alert('There was an error processing the upload. Please try again.');
                }
            }
        }
    );

    // Track which input triggered the upload
    let currentInput = '';
    
    // Add click handlers for file inputs
    document.getElementById('logoUpload').addEventListener('click', function(e) {
        currentInput = 'logoUpload';
        myWidget.open();
    });
    
    document.getElementById('campaignImage').addEventListener('click', function(e) {
        currentInput = 'campaignImage';
        myWidget.open();
    });
    
    document.getElementById('pfp').addEventListener('click', function(e) {
        currentInput = 'pfp';
        myWidget.open();
    });

    function updatePreview() {
        console.log('updatePreview called');
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
        const companyPhone = document.getElementById('companyPhone').value || '(012) 345 6789';
        const companyAddress = document.getElementById('companyAddress').value || '123 Main Street, City, Suite';

        // social media links
        const facebookLink = facebook || '';
        const instagramLink = instagram || '';
        const twitterLink = twitter || '';
        const linkedinLink = linkedin || '';

        renderTemplate(template, profile, name, title, phone, campaignName, 
            campaignDescription, campaignStartDate, campaignEndDate, 
            campaignLink, logo, campaignImage, facebook, instagram, 
            twitter, linkedin, companyPhone, companyAddress);
        }

        function renderTemplate(template, profileImg, name, title, phone, campaignName, 
            campaignDescription, campaignStartDate, campaignEndDate, 
            campaignLink, logoImg, campaignImg, facebookLink, instagramLink, 
            twitterLink, linkedinLink, companyPhone, companyAddress) {
            
            console.log('renderTemplate called with template:', template);
            const preview = document.getElementById('preview');
            let htmlContent = '';

        switch(template) {
            case '1':
                htmlContent = `
                <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                        <tr>
                            <td style="text-align: center; padding: 10px;">
                                <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
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
                                    <img src="${campaignImg || ''}" alt="Campaign Image" style="max-width: 100%; height: auto;">
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
                    <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                            <tr>
                                <td style="text-align: center; margin-bottom: 10px;">
                                    <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
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
                    <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                            <tr>
                                <td style="text-align: center; margin-top: 10px;">
                                    <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
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
                                        <img src="${campaignImg || ''}" alt="Campaign Image" style="width: 100%; max-height: 150px; object-fit: cover; margin-top: 10px;">
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
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 10px;">
                                        <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="flex: 1; padding-right: 10px;">
                                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                                <img src="${profileImg}" alt="Profile Picture" style="height: 50px; border-radius: 50%; margin-right: 10px;">
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
                                                <img src="${campaignImg || ''}" alt="Campaign Image" style="height: 150px; object-fit: cover;">
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
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto;">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 10px;">
                                        <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                                        <img src="${profileImg}" alt="Profile Picture" style="height: 50px; border-radius: 50%; margin-right: 10px;">
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
                                            <img src="${campaignImg || ''}" alt="Campaign Image" style="width: 100%; max-height: 150px; object-fit: cover;">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; margin-bottom: 20px;">
                                        <a href="${campaignLink}" style="color: #004d00;">Learn More</a>
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
                        <table style="font-family: Swiss black; font-size: 18px; border: 1px solid #ddd; border-collapse: collapse; width: 90%; margin: auto; ">
                                <tr>
                                    <td style="text-align: center;">
                                        <img src="${logoImg || ''}" alt="Logo" style="height: 50px;">
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
                                                <img src="${campaignImg || ''}" alt="Campaign Image" style="max-height: 150px; max-width: 50px; object-fit: cover;">
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

        console.log('Setting innerHTML with content length:', htmlContent.length);
        preview.innerHTML = htmlContent;
    }

    // Event listeners for input fields
    document.getElementById('signature-form').addEventListener('input', updatePreview);
    

    // Initial preview update
    console.log('Running initial preview update');
    updatePreview();
});

function copyToClipboard() {
    const preview = document.getElementById('preview');

    // Ensure preview has content
    if (!preview || !preview.innerHTML.trim()) {
        alert('No content to copy! Please fill out the form.');
        return;
    }

    try {
        const range = document.createRange();
        range.selectNodeContents(preview);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        const success = document.execCommand('copy');
        if (success) {
            alert('Signature copied to clipboard! You can paste it into Gmail now.');
        } else {
            alert('Copy failed. Please try again.');
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('An error occurred while copying. Check the console for details.');
    }
}

