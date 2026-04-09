// print.js - Master's Professional Prescription Generator

function printSheet() {
    // Verify name exists before printing
    if (!elements.name.value) {
        alert("Please enter a patient name before printing.");
        return;
    }

    const html = `
<html>
<head>
    <title>Prescription - ${elements.name.value}</title>
    <style>
        /* Reset and Print Settings */
        @media print {
            body {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 15mm;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .no-print { display: none; }
        }

        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #1f2937;
            line-height: 1.5;
            margin: 20px;
        }

        /* Header */
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #1e40af;
            margin-bottom: 25px;
        }

        .header h2 {
            margin: 0 0 5px 0;
            font-size: 28px;
            color: #1e40af;
            font-family: Georgia, serif;
        }

        .header h3 {
            margin: 0;
            font-size: 15px;
            color: #4b5563;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Patient Info */
        .info-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 12px;
            font-size: 15px;
        }

        .info-item {
            display: flex;
            align-items: baseline;
        }

        .info-label {
            font-weight: 600;
            color: #6b7280;
            margin-right: 8px;
            font-size: 11px;
            text-transform: uppercase;
        }

        .info-value {
            border-bottom: 1px dotted #9ca3af;
            min-width: 120px;
            font-weight: 500;
        }

        /* Vitals Grid */
        .vitals-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }

        .vital {
            display: flex;
            flex-direction: column;
        }

        .vital .info-label {
            font-size: 10px;
            margin-bottom: 2px;
        }

        .vital .info-value {
            border-bottom: 1px solid #cbd5e1;
            min-width: unset;
            width: 90%;
        }

        /* Clinical Sections */
        .section {
            margin-top: 25px;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #1e40af;
            text-transform: uppercase;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 8px;
        }

        .content-box {
            min-height: 30px;
            white-space: pre-line;
            padding: 5px 0;
        }

        /* Rx Area */
        .rx-container {
            display: flex;
            margin-top: 30px;
        }

        .rx-symbol {
            font-size: 48px;
            font-family: "Times New Roman", Times, serif;
            font-weight: bold;
            color: #1e40af;
            margin-right: 20px;
            line-height: 0.8;
        }

        .rx-space {
            flex-grow: 1;
            min-height: 300px;
            white-space: pre-line;
            font-size: 16px;
            padding-top: 10px;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
    </style>
</head>
<body>

    <div class="header">
        <h2>Dr. Wankhede</h2>
        <h3>Nimbabai Health and Wellness Clinic</h3>
    </div>

    <div class="info-row">
        <div class="info-item" style="flex-grow: 2;">
            <span class="info-label">Patient Name:</span>
            <span class="info-value" style="width: 100%;">${elements.name.value}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Date:</span>
            <span class="info-value">${elements.date.value}</span>
        </div>
    </div>

    <div class="info-row">
        <div class="info-item">
            <span class="info-label">Mobile:</span>
            <span class="info-value">${elements.mobile.value}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Age:</span>
            <span class="info-value">${elements.age.value}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Sex:</span>
            <span class="info-value">${elements.sex.value}</span>
        </div>
    </div>

    <div class="vitals-box">
        <div class="vital"><span class="info-label">Height</span><span class="info-value">${elements.height.value || '-'}</span></div>
        <div class="vital"><span class="info-label">Weight</span><span class="info-value">${elements.weight.value || '-'}</span></div>
        <div class="vital"><span class="info-label">Pulse</span><span class="info-value">${elements.pulse.value || '-'}</span></div>
        <div class="vital"><span class="info-label">BP</span><span class="info-value">${elements.bp.value || '-'}</span></div>
        <div class="vital"><span class="info-label">Temp</span><span class="info-value">${elements.temp.value || '-'}</span></div>
        <div class="vital"><span class="info-label">Resp. Rate</span><span class="info-value">${elements.rr.value || '-'}</span></div>
        <div class="vital"><span class="info-label">Sugar</span><span class="info-value">${elements.sugar.value || '-'}</span></div>
    </div>

    <div class="section">
        <div class="section-title">Present Complaints</div>
        <div class="content-box">${elements.complaints.value || '-'}</div>
    </div>

    <div class="rx-container">
        <div class="rx-symbol">℞</div>
        <div class="rx-space">${elements.rx.value || ''}</div>
    </div>

    <div class="section">
        <div class="section-title">Investigation</div>
        <div class="content-box">${elements.investigation.value || '-'}</div>
    </div>

    <div class="footer info-row">
        <div class="info-item">
            <span class="info-label">Follow Up:</span>
            <span class="info-value">${elements.followup.value || 'As needed'}</span>
        </div>
    </div>

    <script>
        window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
        };
    </script>
</body>
</html>
`;

    const w = window.open("", "", "width=900,height=800");
    if (!w) {
        alert("Popup blocked. Please allow popups for printing.");
        return;
    }
    w.document.write(html);
    w.document.close();
}