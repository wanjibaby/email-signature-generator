document.addEventListener('DOMContentLoaded', function() {
    // Store image urls
    let imageUrls = {
        logo: '',
        campaignImage: '',
        profile: ''
    };

    // Shared styling
     const tableStyle = `
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        border-collapse: collapse;
        width: 400px !important;
        max-width: 400px !important;
        min-width: 400px !important;
        height: auto !important;
        max-height: 250px !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        overflow: hidden !important;
        table-layout: fixed !important;
    `;

    const imageStyles = {
        logo: `
            width: 35px !important;
            height: 35px !important;
            max-width: 35px !important;
            max-height: 35px !important;
            object-fit: cover;
            display: block;
        `,
        campaign: `
            width: 180px !important;
            height: 100px !important;
            max-width: 180px !important;
            max-height: 100px !important;
            object-fit: cover;
            display: block;
        `,
        profile: `
            width: 35px !important;
            height: 35px !important;
            border-radius: 50% !important;
            object-fit: cover;
            display: block;
        `
    };

    const textStyles = {
        base: `
            font-size: 12px !important;
            line-height: 1.4 !important;
            margin: 0 !important;
            padding: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        `,
        name: `
            font-weight: bold !important;
            font-size: 12px !important;
        `,
        link: `
            color: #004d00 !important;
            text-decoration: none !important;
            font-size: 12px !important;
        `
    };

    const socialLinkStyle = `
        color: #004d00 !important;
        text-decoration: none !important;
        font-size: 11px !important;
        margin: 0 2px !important;
    `;

    // Initialize Cloudinary widget
    const myWidget = createCloudinaryWidget();

    // Event delegation for upload buttons
    document.getElementById('upload-buttons').addEventListener('click', function(e) {
        if (e.target.classList.contains('upload-button')) {
            myWidget.open();
            myWidget.currentInput = e.target.dataset.input; // Save input type
        }
    });

    // Cloudinary widget config
    function createCloudinaryWidget() {
       return cloudinary.createUploadWidget(
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
                        switch(myWidget.currentInput) {
                            case 'logoUpload':
                                imageUrls.logo = result.info.secure_url;
                                break;
                            case 'campaignImage':
                                imageUrls.campaignImage = result.info.secure_url;
                                break;
                            case 'pfp':
                                imageUrls.profile = result.info.secure_url;
                                break;
                            default:
                                console.warn('Unknown input type:', myWidget.currentInput);
                                return;
                            }

                         // Debug
                        console.log('Updated image URLs:', imageUrls);
                        
                        // Update the preview immediately after upload
                        updatePreview();
                     } catch (e) {
                        console.error('Error processing upload result:', e);
                        alert('There was an error processing the upload. Please try again.');
                    }
                }
            }
        );
    }

    function updatePreview() {
        console.log('updatePreview called');
        const name = document.getElementById('name').value || 'John Doe';
        const title = document.getElementById('title').value || 'Software Engineer';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const campaignName = document.getElementById('campaignName').value || 'Summer Sale!';
        const campaignDescription = document.getElementById('campaignDescription').value || 'Sale! Sale!';
        const campaignStartDate = document.getElementById('campaignStartDate').value || 'Start Date';
        const campaignEndDate = document.getElementById('campaignEndDate').value || 'End Date';
        const campaignLink = document.getElementById('campaignLink').value || '#';
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

        renderTemplate(template, imageUrls.profile, name, title, phone, campaignName,
                campaignDescription, campaignStartDate, campaignEndDate,
                campaignLink, imageUrls.logo, imageUrls.campaignImage, facebookLink, instagramLink,
                twitterLink, linkedinLink, companyPhone, companyAddress);
    }
    function renderTemplate(template, profileImg, name, title, phone, campaignName,
        campaignDescription, campaignStartDate, campaignEndDate,
        campaignLink, logoImg, campaignImg, facebookLink, instagramLink,
        twitterLink, linkedinLink, companyPhone, companyAddress) {

    // Generate social media links HTML
    const socialLinks = [
        { name: 'Facebook', link: facebookLink },
        { name: 'Instagram', link: instagramLink },
        { name: 'Twitter', link: twitterLink },
        { name: 'LinkedIn', link: linkedinLink }
    ]
        .filter(social => social.link)
        .map(social => `<a href="${social.link}" style="${socialLinkStyle}" target="_blank">${social.name}</a>`)
        .join(' | ');

         let htmlContent = '';

         switch(template) {
             case '1':
                 htmlContent = `
                     <table style="${tableStyle}">
                         <tr>
                             <td style="text-align: center; padding: 8px;">
                                 <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                             </td>
                         </tr>
                         <tr>
                             <td style="text-align: right; padding: 8px;">
                                 <div style="${textStyles.base}">
                                     <strong style="${textStyles.name}">${name}</strong><br/>
                                     <span style="${textStyles.base}">${title}</span><br/>
                                     <span style="${textStyles.base}">${phone}</span>
                                 </div>
                             </td>
                         </tr>
                         <tr>
                             <td style="padding: 8px;">
                                 <div style="${textStyles.base}">
                                     <strong style="${textStyles.base}">${campaignName}</strong><br/>
                                     <span style="${textStyles.base}">${campaignDescription}</span><br/>
                                     <span style="${textStyles.base}">Dates: ${campaignStartDate} - ${campaignEndDate}</span><br/>
                                     <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
                                 </div>
                             </td>
                         </tr>
                         <tr>
                             <td style="text-align: center; padding: 8px;">
                                 <a href="${campaignLink}" target="_blank">
                                     <img src="${campaignImg || ''}" alt="Campaign Image" style="${imageStyles.campaign}">
                                 </a>
                             </td>
                         </tr>
                         <tr>
                             <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                 <div style="font-size: 11px !important;">
                                     ${socialLinks}<br/>
                                     ${companyPhone}<br/>
                                     ${companyAddress}<br/>
                                     TARPO
                                 </div>
                             </td>
                         </tr>
                     </table>
                 `;
                 break;
            
           case '2':
                htmlContent = `
                    <table style="${tableStyle}">
                            <tr>
                                <td style="text-align: center; padding: 8px;">
                                    <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: right; padding: 8px;">
                                    <strong style="${textStyles.name}">${name}</strong><br/>
                                    <span style="${textStyles.base}">${title}</span><br/>
                                    <span style="${textStyles.base}">${phone}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center; margin: 10px 0;">
                                    <strong style="${textStyles.name}">${campaignName}</strong><br/>
                                    <span style="${textStyles.base}">${campaignDescription}</span><br/>
                                    <span style="${textStyles.base}">Dates: ${campaignStartDate} - ${campaignEndDate}</span><br/>
                                    <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                    <div style="font-size: 16px;">
                                        ${socialLinks}<br/>
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
                        <table style="${tableStyle}">
                            <tr>
                                <td style="text-align: center; margin-top: 10px;">
                                    <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                                </td>
                            </tr>
                            <tr>
                                <td style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                                    <div style="flex: 1;">
                                        <strong style="${textStyles.name}">${name}</strong><br/>
                                        <span style="${textStyles.base}">${title}</span><br/>
                                        <span style="${textStyles.base}">${phone}</span>
                                    </div>
                                    <div style="text-align: right;">
                                        <strong style="${textStyles.name}">${campaignName}</strong><br/>
                                        <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
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
                                <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                    <div style="font-size: 16px;">
                                        ${socialLinks}<br/>
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
                        <table style="${tableStyle}">
                            <tr>
                                <td style="text-align: center; margin-bottom: 10px;">
                                    <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                                </td>
                            </tr>
                            <tr>
                                <td style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div style="flex: 1; padding-right: 10px;">
                                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                            <img src="${profileImg}" alt="Profile Picture" style="${imageStyles.profile}">
                                            <div style="text-align: left;">
                                                <strong style="${textStyles.name}">${name}</strong><br/>
                                                <span style="${textStyles.base}">${title}</span><br/>
                                                <span style="${textStyles.base}">${phone}</span>
                                            </div>
                                        </div>
                                        <div style="text-align: left;">
                                            <strong style="${textStyles.name}">${campaignName}</strong><br/>
                                            <span style="${textStyles.base}">${campaignDescription}</span><br/>
                                            <span style="${textStyles.base}">Dates: ${campaignStartDate} - ${campaignEndDate}</span><br/>
                                            <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
                                        </div>
                                    </div>
                                    <div style="flex: 0 0 auto; text-align: right;">
                                        <a href="${campaignLink}" target="_blank">
                                            <img src="${campaignImg || ''}" alt="Campaign Image" style="${imageStyles.campaign}">
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                    <div style="font-size: 16px;">
                                        ${socialLinks}<br/>
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
                            <table style="${tableStyle}">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 10px;">
                                        <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                                        <img src="${profileImg}" alt="Profile Picture" style="${imageStyles.profile}">
                                        <div style="text-align: center;">
                                            <strong style="${textStyles.name}">${name}</strong><br/>
                                            <span style="${textStyles.base}">${title}</span><br/>
                                            <span style="${textStyles.base}">${phone}</span>
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
                                        <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                        <div style="font-size: 16px;">
                                            ${socialLinks}<br/>
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
                    <table style="${tableStyle}">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="${logoImg || ''}" alt="Logo" style="${imageStyles.logo}">
                                </td>
                            </tr>
                            <tr>
                                <td style="display: flex; margin-top: 10px;">
                                    <div style="flex: 1;">
                                         <strong style="${textStyles.name}">${name}</strong><br/>
                                          <span style="${textStyles.base}">${title}</span><br/>
                                          <span style="${textStyles.base}">${phone}</span><br/>
                                         <br/>
                                        <strong style="${textStyles.name}">${campaignName}</strong><br/>
                                        <span style="${textStyles.base}">${campaignDescription}</span><br/>
                                        <span style="${textStyles.base}">Dates: ${campaignStartDate} - ${campaignEndDate}</span><br/>
                                        <a href="${campaignLink}" style="${textStyles.link}">Learn More</a>
                                    </div>
                                    <div style="flex: 1; text-align: right;">
                                        <a href="${campaignLink}" target="_blank">
                                            <img src="${campaignImg || ''}" alt="Campaign Image" style="max-height: 150px; max-width: 50px; object-fit: cover;">
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-top: 2px solid #5bbc5c; text-align: center; padding: 8px;">
                                    <div style="font-size: 16px;">
                                        ${socialLinks}<br/>
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

async function copyToClipboard() {
     const preview = document.getElementById('preview');

    // Ensure preview has content
    if (!preview || !preview.innerHTML.trim()) {
        alert('No content to copy! Please fill out the form.');
        return;
    }

    try {
        // Try using modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            // Create a temporary div to handle HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = preview.innerHTML;

            // Create two clipboard items: one for plain text and one for HTML
            const clipboardItem = new ClipboardItem({
                'text/html': new Blob([preview.innerHTML], { type: 'text/html' }),
                'text/plain': new Blob([tempDiv.textContent], { type: 'text/plain' })
            });

            await navigator.clipboard.write([clipboardItem]);
            alert('Signature copied to clipboard! You can paste it into Gmail now.');
            return;
        }

        // Fallback for older browsers or non-secure contexts
        const range = document.createRange();
        range.selectNodeContents(preview);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Try the deprecated execCommand as a fallback
        const success = document.execCommand('copy');

        // Clean up selection
        selection.removeAllRanges();

        if (success) {
            alert('Signature copied to clipboard! You can paste it into Gmail now.');
        } else {
            throw new Error('execCommand copy failed');
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);

        // Provide user-friendly error message with instructions
        alert(
            'Unable to automatically copy the signature. Please copy it manually:\n' +
            '1. Click and drag to select the entire signature\n' +
            '2. Press Ctrl+C (Windows) or Cmd+C (Mac) to copy\n' +
            '3. Paste into Gmail using Ctrl+V or Cmd+V'
        );
    }
}
