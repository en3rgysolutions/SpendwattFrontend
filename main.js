// ==UserScript==
// @name Spendwatt Link Text Adder
// @namespace http://tampermonkey.net/
// @version 1.5
// @description Finds the .report div and inserts a new .custom_header div as the first element inside it. Also rearranges existing elements. Image display is now conditional on payment selection.
// @author Gorkhari
// @match https://share.spendwatt.com.au/*
// @grant none
// ==/UserScript==

(function() {
'use strict';

/**
* Function to inject global CSS styles into the document's <head>.
* @param {string} css - The CSS rules as a string.
*/
function addGlobalStyle(css) {
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
document.head.appendChild(style);
}

// --- Start of CSS Injection ---
addGlobalStyle(`

.report {
padding-top: 20px;
font-family: 'Arial', sans-serif;
}

.fs-18.ls-normal.darkgray.mt-5 {
display: none;
}

.before-after-summary .before-after-grid {
width: 100%;
display: grid;
grid-template-columns: 38% 38% 24%;
row-gap: 1rem;
}

.before-after-summary {
display: flex;
flex-direction: column;
margin-top: 35px !important;
margin-bottom:35px !important;
}

.charts-container .sub-charts {
display: none;
flex-direction: row;
}

.summary {
font-family: var(--main-font);
font-size: 12px;
color: #888689;
overflow: visible;
margin-bottom: 1rem;
}

.custom1 {
margin-bottom: 80px;
}
.custom2 {
margin-bottom: 20px;
}

.custom3, .custom4 {
display: none;
}

.print-acceptance {
display: flex;
flex-direction: column-reverse;
color: #888689;
font-size: 1.125rem;
}

.print-acceptance .print-disclaimer {
    margin-top: 0px;
    margin-bottom: 20px;
    font-size: 0.75rem;
}

.print-acceptance .acceptance-line, .print-acceptance .fw-semibold, .print-acceptance span {
display: none;
}

.payment-terms-container {
line-height: 1.6;
padding: 20px;
border: 1px solid #e0e0e0;
border-radius: 8px;
background-color: #f9f9f9;
}

.payment-terms-container h2 {
color: #0056b3; /* Primary Blue */
border-bottom: 2px solid #0056b3;
padding-bottom: 5px;
margin-top: 15px;
margin-bottom: 15px;
}

.payment-terms-container h3 {
color: #333;
margin-top: 25px;
margin-bottom: 10px;
}

/* EFT List Styling */
.eft-details {
list-style: none; /* Remove bullet points */
padding-left: 0;
margin-left: 20px;
}

.eft-details li {
margin-bottom: 5px;
}

.finance-header {
margin-top: 30px;
border-bottom: 2px solid #0056b3;
}

.finance-partners-grid {
display: grid;
width: 100%;
grid-template-columns: 2fr 2fr;
gap: 10px;
margin-top: 10px;
}

.partner-item {
padding: 10px;
border: 1px solid #ccc;
border-radius: 8px;
background-color: #fff;
/* Optional: Small shadow for depth */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Ensure logos are a reasonable size */
.partner-logo {
max-width: 150px;
height: auto;
display: block; /* Centers block elements */
margin: 0 auto 10px auto; /* Center logo and add bottom margin */
}

/* ------------------------------------------------ */
/* 3. Responsiveness for smaller screens */
/* ------------------------------------------------ */
@media (max-width: 768px) {
.finance-partners-grid {
/* Stack items vertically on mobile devices */
grid-template-columns: 1fr;
}
}

.header.break-inside-avoid {
    display: flex;
    justify-content: space-between;
    background: #1a2d44;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
}
.logo img {
    width: 300px;
}

.left-info {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.banner img {
    width: 100%;
    margin-bottom: 10px;
}

.alignDiv {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 30px;
    text-align: center;
}

.ConalignDiv {
    display: flex;
}

.SellerBanner {
    background: #1a2d44;
    color: white;
    margin: 20px 0 10px 0;
}

.SellerBanner h5 {
    display: flex;
    justify-content: center;
    font-size: larger;
    padding-top: 20px;
}

.alignDiv p {
    color: gold;
}

.Header-main p, .Payment-Finance p{
font-size: 18px;
letter-spacing: normal;
}
</style>

`);


window.addEventListener('load', function() {

const existingDiv = document.querySelector('.print-acceptance');
const existingDiv2 = document.querySelector('.report');
const productManu = document.querySelector('.product-props');
const divText = productManu.textContent;
const searchTerm = "RISEN SOLAR ENERGY";
const found = divText.includes(searchTerm);
console.log(found);
const elements1 = document.getElementsByClassName("before-after-summary mt-6 break-before-page");
const elements2 = document.getElementsByClassName("print-charts");
const customClasses = ["custom1", "custom2", "custom3", "custom4"];
const elementsToModify = document.querySelectorAll(".print-charts .break-before-page");
const targetElements = document.querySelectorAll(".break-inside-avoid:has(> .quote-budget)");

const changetext1 = document.querySelectorAll(".print-acceptance h1");
changetext1[0].innerHTML = "Like what you see or want to revise the Proposal.<p style='font-size:20px; font-weight:normal;'>To proceed with this proposal/quote Call Us at 131 750 or Email us at Contact@en3rgy.au</p>";


const changetext2 = document.querySelectorAll(".break-inside-avoid .product-summary span");
changetext2[0].innerHTML = "Install & List of materials";

const summaries = document.querySelectorAll('.summary');
summaries.forEach(div => {
  if (div.textContent.includes('If you like the look of this indicative price proposal')) {
    div.innerHTML = '<p style="font-size:20px;">If you are looking do finance, Please Call us for Assistance 131 750.</p>';
  }
});

document.querySelectorAll('div').forEach(div => {
    if (div.textContent.trim() === 'Install & balance of materials') {
        div.textContent = 'Install & list of materials';
    }
});



let i = 0;
if (elementsToModify.length > 0) {
elementsToModify.forEach(element => {
element.classList.remove("break-before-page");
const newClass = customClasses[i % customClasses.length];
element.classList.add(newClass);
i++;
});
console.log(`Successfully replaced 'break-before-page' with custom classes on ${elementsToModify.length} element(s).`);
} else {
console.log("No matching elements found to modify.");
}

const element1 = elements1[0];
const element2 = elements2[0];
const targetElement = targetElements[0];
element1.classList.remove("break-before-page");
targetElement.classList.remove("break-inside-avoid");
element2.classList.add("CustomClass");
element2.classList.remove("print-charts");

const paymentFinanceHTML = `<div class="break-inside-avoid">
<h1>Payment Terms</h1>
<p><strong>NOTE:</strong> If you would like to proceed with this quote, please reply by email, call our office <strong>131 750.</strong></p>
<p>A 20% deposit is requested to initiate the works as quoted. Payment can be made either by EFT, Cash, Cheque, or Credit Cards (which incur a financial institution surcharge). We have financing options available to meet specific requirements, i.e., payment plans.</p>

<H4>Deposit payments can be made via EFT to the following details:</h4>
<ul>
<li><p><strong>Name:</strong> En3rgy Solutions</p></li>
<li><p><strong>BSB:</strong> 085-005</p></li>
<li><p><strong>ACC NO:</strong> 729105093</p></li>
</ul>
<p>Please enquire to discuss these options by phoning <strong>131 750</strong>.</p>
<p><strong>Disclaimer: </strong>Acceptance of this quote is with the understanding and acknowledgement of our full terms & conditions as outlined on our website at <a href="http://en3rgy.au/terms-and-conditions">en3rgy.au/terms-and-conditions</a>.</p>
<br>
<h1>Finance Partners</h1>
<div class="finance-partners-grid">
<div class="partner-item">
<img src="https://en3rgy.au/wp-content/uploads/2025/10/humm-1.png" alt="Parker Lane Logo" class="partner-logo">
<p>Parker Lane reverses the traditional finance model. We start with the biggest problems first, understanding the challenges then working with banks and lenders to create superior products and solutions. Our easy process and incredible team make it simple to apply, get approved.</p>
</div>
<div class="partner-item">
<img src="https://en3rgy.au/wp-content/uploads/2025/10/humm.png" alt="humm Logo" class="partner-logo">
<p>As a humm partner, we provide you with access to exclusive Long Term Interest Free finance that gives you 0% Interest on Fixed Instalment Plans for up to 60 months to pay off your purchase. It’s easy to apply online and takes only a few minutes.</p>
</div>
<div class="partner-item">
<img src="https://en3rgy.au/wp-content/uploads/2025/10/afterpay.png" alt="handypay Logo" class="partner-logo">
<p>With Handypay Green Loans, you can borrow up to $30,000 for energy efficient products such as solar, solar hot water, batteries, or more. The Handypay 0% interest payment plan provides you the opportunity to be sustainable today.</p>
</div>
<div class="partner-item">
<img src="http://en3rgy.au/wp-content/uploads/2025/10/afterpay-1.png" alt="afterpay Logo" class="partner-logo">
<p>With Afterpay, Pay in 4 interest-free installments. Budget your spending. Earn rewards when you shop. Discover thousands of brands and millions of products, online and in-store. Do it all in the app, easily and securely.</p>
</div>
</div>
</div>
`;
if (existingDiv) {
const newDiv = document.createElement('div');
newDiv.classList.add('Payment-Finance');
newDiv.innerHTML = paymentFinanceHTML;
existingDiv.after(newDiv);
console.log("Payment and Finance information successfully inserted.");
} else {
console.error("Target element 'existingDiv' not found. Insertion failed.");
}

const HeaderHTML = `
    <div class="header break-inside-avoid">
    <div class="logo">
    <img src="http://en3rgy.au/wp-content/uploads/2025/11/ENERGY-LOGO-2-1-scaled.png"></src>
    </div>
    <div class="left-info">
    <p><strong>Sharpe Energy Solutions</strong></p>
     <p>P: 131 750</p>
      <p>49 Port Road, Thebarton, SA, 5031
      </p>
    </div>
    </div>

    <div class="banner">
    <img src="http://en3rgy.au/wp-content/uploads/2025/11/IMAGE.jpg"></src>
    </div>

<h2><b>Your Complimentary, Engineered Energy Savings Plan</b></h2>

<b><p>Hi <span id="ThisName"></span>,</p></b>

<p>Thank you for choosing Sharpe Energy Solutions as your trusted energy solutions retailer. With over 45 years of successful operation, we pride ourselves on sourcing high-quality, high-efficiency solar modules and battery systems employing accredited electricians to deliver installations that meet the highest professional and ethical standards.</p>

<p>As one of the industry’s pioneering solar & battery specialists, our strength lies in our experience. Backed by
decades of combined expertise, our team of certified electricians and Clean Energy Council-accredited technicians provides tailored solar and battery solutions designed to reduce your energy costs and environmental footprint.</p>

<h5><b>SHARPE ENERGY SOLUTIONS APPROACH</b></h5>

<span><b>COMPARE</span></b>
<p>The Power to Compare Energy Savings Potential. Unlock the ability to make smarter energy decisions by
comparing savings potential across different options.</p>

<span><b>EVALUATE</span></b>
<p>Make the leap to next-generation technology. Switching to ALL-Electric isn’t just a trend, it’s a smart investment that can save you thousands over time.</p>

<span><b>INVEST</span></b>
<p>Make smart choices that pay off. Take advantage of Government Rebates & Incentives to lower upfront costs and maximize your return.</p>

<h5><b>Your Customised Energy Saving Plan</b></h5>
<p>Based on your specific requirements, I’ve prepared an engineered energy-saving plan. This proposal provides
all the essential details you need to begin your energy transformation, including:</p>
<ul>
<li>Energy efficient system recommendations designed for your home</li>
<li>Estimated savings on your electricity bills</li>
<li>Projected return on investment and payback period</li>
</ul>
<p>I look forward to guiding you through this proposal and welcoming you as a valued En3rgy Solutions customer.</p>
</div>



<div class="header break-inside-avoid break-before-page">
    <div class="logo">
    <img src="http://en3rgy.au/wp-content/uploads/2025/11/ENERGY-LOGO-2-1-scaled.png"></src>
    </div>
    <div class="left-info">
    <p><strong>Sharpe Energy Solutions</strong></p>
     <p>P: 131 750</p>
      <p>49 Port Road, Thebarton, SA, 5031
      </p>
    </div>
    </div>
<h1>Our History</h1>

<p>Sharpe Energy Solutions was founded by industry veterans with a shared passion for innovation and service, and built on the core belief that energy should work for people, not the other way around.</p>

<p>Established over a decade ago, our initial vision was to offer truly integrated, smart energy solutions, moving beyond basic solar installation. We rapidly built a reputation across Adelaide and regional South Australia for exceptional workmanship and customer-centric service, focusing on quality and Tier 1 equipment for every installation.</p>

<p>As technology matured, we became leaders in high-capacity battery storage, enabling thousands of customers to achieve true energy self-sufficiency and protect themselves against grid instability and rising power prices.</p>

<p>Today, Sharpe Energy Solutions stands as a trusted partner for thousands of households and businesses. We continue to help customers across Adelaide and regional South Australia take definitive control of their energy usage through smart solar, battery, and advanced electrical solutions. Our history is rooted in solving problems, embracing new technology, and delivering reliable, personalized energy independence for every customer.</p>

<h3>OUR PROMISE</h3>

<p>We believe in doing things right the first time. That means using only trusted brands, ensuring every installation meets Australian standards, and treating your home with the utmost care and respect.</p>

<p>Join the energy revolution with Sharpe Energy Services. Whether you’re looking to reduce your power bills,
upgrade your home’s efficiency, or invest in renewable energy, we’re here to help you every step of the way.</p>

<div class="banner">
<img src="http://en3rgy.au/wp-content/uploads/2025/11/second-banner.jpg"></src>
</div>

<div class="SellerBanner">
<h5><b>Our 45+ Year Customer Savings Scoreboard</h5></b>
<div class="ConalignDiv">
<div class="alignDiv">
<p><b>4200</b></p>
<span>Number of Intelligent Energy Solution Installed Last 10 Years</span>
</div>

<div class="alignDiv">
<p><b>85%</b></p>
<span>The Average Home Bill Crush Percentage or $2,857 per Home.</span>
</div>

<div class="alignDiv">
<p><b>$10Mil+</b></p>
<span>Our Customer Savings on Energy Bills for 2023 (4,320 SA Homes)</span>
</div>
</div>
</div>

</div>
`;
if (existingDiv) {
const newDiv2 = document.createElement('div');
newDiv2.classList.add('Header-main');
newDiv2.innerHTML = HeaderHTML;
existingDiv2.before(newDiv2);
}

const data = document.getElementsByClassName("fs-48");
const username = data[0].innerHTML;
const firstName = username.split(' ')[0];
const usernameDiv = document.getElementById('ThisName');
if (usernameDiv) {
    usernameDiv.textContent = firstName;
} else {
    console.error("Target element with ID 'ThisName' not found.");
}

});
})();
