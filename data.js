const examData = [
    {
        id: 1, type: "single", text: "How does role separation improve server security?",
        options: ["A. By installing applications on separate hard disks.", "B. By physically separating high-security servers from other servers.", "C. By enforcing the principle of least privilege.", "D. By placing servers on separate VLANs."],
        correct: 2
    },
    {
        id: 2, type: "matrix", 
        text: "For each statement, select True or False.\nNote: You will receive partial credit for each correct selection.",
        statements: [
            "Because senior executives have rights to access sensitive data, they should use administrator accounts.",
            "One purpose of User Account Control (UAC) is to grant users the lowest level permissions required to complete their tasks.",
            "System administrators should use a standard user account when performing routine functions like reading emails and browsing the internet."
        ],
        options: ["True", "False"],
        correct: [1, 0, 0] // 1=False, 0=True
    },
    {
        id: 3, type: "single", text: "You review the application Properties dialog box for C:\\Apps\\application.bat. The security tab shows groups like 'Everyone' and 'Administrators'. What file system is this file on, and whose permissions are currently being displayed?",
        options: ["A. FAT32 file system; Administrators permissions are displayed.", "B. NTFS file system; Everyone permissions are displayed.", "C. exFAT file system; System permissions are displayed.", "D. ReFS file system; Everyone permissions are displayed."],
        correct: 1
    },
    {
        id: 4, type: "dragdrop", 
        text: "You need to identify the different types of security policies.\nMove each policy description from the list on the left to the correct policy on the right.",
        sources: [
            "A policy that describes permissible behaviors on a computer network",
            "A policy that grants or revokes permissions for an employee or a group of employees on a computer network",
            "A policy that defines actions to take after an unexpected or uncommon event",
            "A policy that defines the requirements to connect to a computer network from outside that network"
        ],
        targets: [
            "Remote Access Policy",
            "Access Control Policy",
            "Incident Response Policy",
            "Acceptable Use Policy"
        ],
        correct: [3, 1, 2, 0] // Target index mapped to Source index
    },
    {
        id: 5, type: "single", text: "What is a user probably receiving if they get a large number of emails selling prescription medicine?",
        options: ["A. Spam", "B. Malware", "C. Pharming mail", "D. Spoofed mail"],
        correct: 0
    },
    {
        id: 6, type: "single", text: "You create a web server for your school. When users visit your site, they get a certificate error that says your site is not trusted. What should you do to fix this problem?",
        options: ["A. Enable Public Keys on your website.", "B. Use a digital signature.", "C. Generate a certificate request.", "D. Install a certificate from a trusted Certificate Authority (CA)."],
        correct: 3
    },
    {
        id: 7, type: "single", text: "Creating MD5 hash for files is an example of ensuring what?",
        options: ["A. Integrity", "B. Availability", "C. Confidentiality", "D. Least privilege"],
        correct: 0
    },
    {
        id: 8, type: "single", text: "Which link is a valid secure link to the CompanyPro account management site?",
        options: ["A. http://secure.companypro/SecureSignin", "B. http://VPN.VisitMe/logon.html", "C. https://companypro/SecureSignin/", "D. http://VPN VisitMe/SecureSignin/"],
        correct: 2
    },
    {
        id: 9, type: "matrix", 
        text: "For each statement, select True or False.",
        statements: [
            "To protect users from malicious browser pop-ups, you should set a default browser configuration that blocks untrusted pop-ups.",
            "Pop-ups can display a realistic operating system or application error message.",
            "Protecting users from untrusted pop-up applications is mostly a function of awareness."
        ],
        options: ["True", "False"],
        correct: [0, 0, 1] // True, True, False
    },
    {
        id: 10, type: "dragdrop", 
        text: "You work on a team responsible for planning a backup strategy. Move each backup strategy from the list on the left to its recovery time description on the right.",
        sources: [
            "Strategy 1: Full backup every night",
            "Strategy 2: Full backup Sunday night and an incremental backup Monday through Saturday night",
            "Strategy 3: Full backup Sunday night and a differential backup Monday through Saturday night"
        ],
        targets: [
            "Method with fastest data recovery time",
            "Method with intermediate data recovery time",
            "Method with slowest data recovery time"
        ],
        correct: [0, 2, 1]
    },
    {
        id: 11, type: "single", text: "How should the certificate of a secure public web server on the internet be signed?",
        options: ["A. By an enterprise certificate authority (CA)", "B. By a public certificate authority (CA)", "C. By using a 4096-bit key", "D. By using a 1024-bit key"],
        correct: 1
    },
    {
        id: 12, type: "single", text: "You need to implement a firewall that includes examining the origin of the data. Which type of firewall should you implement?",
        options: ["A. Application layer", "B. Stateful", "C. Content filter", "D. Network layer"],
        correct: 3
    },
    {
        id: 13, type: "single", text: "What should you use to protect systems from buffer overflow errors?",
        options: ["A. An Intruder Prevention System", "B. Data Execution Prevention", "C. Antivirus software", "D. A proxy server"],
        correct: 1
    },
    {
        id: 14, type: "single", text: "Your anti-spam program is blocking emails from a particular sender. Your company needs to receive emails from this sender. What should you do?",
        options: ["A. Add the email address to the whitelist.", "B. List the sender's email address in DNS.", "C. Accept RSS feeds from their domain.", "D. Reconfigure the SMS Gateway."],
        correct: 0
    },
    {
        id: 15, type: "single", text: "Which networking protocol provides centralized authentication, authorization, and accounting?",
        options: ["A. HTTPS", "B. OpenID", "C. RADIUS", "D. SMTP"],
        correct: 2
    },
    {
        id: 16, type: "single", text: "You help manage 1000 workstations on an Active Directory Domain. You need to push an application security patch to all workstations. What is the quickest method to do this?",
        options: ["A. Local security policy", "B. Logon script", "C. Windows Update", "D. Group policy"],
        correct: 3
    },
    {
        id: 17, type: "single", text: "You install a system-file checksum-verification application on your servers. What does this help to ensure?",
        options: ["A. Confidentiality", "B. Integrity", "C. Accessibility", "D. Availability"],
        correct: 1
    },
    {
        id: 18, type: "single", text: "Which type of password attack attempts to guess passwords by using a list of common passwords?",
        options: ["A. Rainbow table", "B. Brute force", "C. Keylogger", "D. Dictionary"],
        correct: 3
    },
    {
        id: 19, type: "single", text: "Why should you implement a wireless intrusion prevention system?",
        options: ["A. To prevent rogue wireless access points", "B. To enforce SSID broadcasting", "C. To prevent wireless interference", "D. To detect wireless packet theft"],
        correct: 0
    },
    {
        id: 20, type: "multiple", text: "What are three major attack vectors that a social engineering hacker might use? (Choose 3.)",
        options: ["A. Honeypot systems", "B. Dumpster diving", "C. Telephone", "D. Firewall interface", "E. Reverse social engineering"],
        correct: [1, 2, 4]
    },
    {
        id: 21, type: "matrix", 
        text: "For each statement, select True or False.",
        statements: [
            "You can view audit logs in the Event Viewer.",
            "Audit logs have a set size limit and cannot be adjusted.",
            "You can configure an event notification for an audited activity."
        ],
        options: ["True", "False"],
        correct: [0, 1, 0] // True, False, True
    },
    {
        id: 22, type: "multiple", text: "Which two vulnerabilities is a wireless network client exposed to? (Choose 2.)",
        options: ["A. File corruption", "B. Rogue access points", "C. Eavesdropping", "D. Buffer overflow"],
        correct: [1, 2]
    },
    {
        id: 23, type: "multiple", text: "Which two strategies will help keep your devices free from viruses and malware? (Choose 2.)",
        options: ["A. Keep antivirus and anti-malware software definitions up to date.", "B. Ensure that the Windows Firewall is disabled.", "C. Ensure that all network ports are available.", "D. Ensure that Real-time Protection is disabled.", "E. Configure full antivirus and anti-malware scans to run automatically on a regular schedule."],
        correct: [0, 4]
    },
    {
        id: 24, type: "single", text: "Your organization has a Windows BYOD policy. Where should you go on the local device to verify and configure malware protection settings?",
        options: ["A. Device Performance and Health", "B. Account Protection", "C. Virus & Threat Protection", "D. User Account Control"],
        correct: 2
    },
    {
        id: 25, type: "single", text: "What is an example of physical security for a laptop?",
        options: ["A. Fingerprint reader", "B. Cable lock", "C. Docking station", "D. External USB drive"],
        correct: 1
    },
    {
        id: 26, type: "single", text: "Which term refers to a physical opportunity that a hacker might use to look for information about a computer network?",
        options: ["A. Reverse social engineering", "B. Phishing", "C. Dumpster diving", "D. Malware"],
        correct: 2
    },
    {
        id: 27, type: "single", text: "You are a network administrator. All computers run Chrome. You need to prevent third-party cookies from being saved. What should you enforce?",
        options: ["A. Antivirus protection", "B. Cross-Site Scripting Filter", "C. Incognito", "D. SmartScreen Filter"],
        correct: 2
    },
    {
        id: 28, type: "single", text: "What can intercept passwords that are transmitted in clear text?",
        options: ["A. A Kerberos client", "B. A rogue DHCP server", "C. An IPsec decoder", "D. A packet sniffer"],
        correct: 3
    },
    {
        id: 29, type: "single", text: "The client computers on your network are stable and do not need any new features. What is a benefit of applying operating system updates to these clients?",
        options: ["A. Update the hardware firewall.", "B. Keep the software licensed.", "C. Close existing vulnerabilities.", "D. Keep the server ports available."],
        correct: 2
    },
    {
        id: 30, type: "single", text: "You need to hide internal IP addresses from the internet while maintaining client internet access. What should you implement?",
        options: ["A. Secure Sockets Layer (SSL)", "B. Access Control Lists", "C. Network Address Translation (NAT)", "D. Port forwarding"],
        correct: 2
    },
    {
        id: 31, type: "single", text: "You move a file from one NTFS server to another NTFS server. What permissions does the file have in the new location?",
        options: ["A. The file retains the original folder's permissions.", "B. Access will be limited to members of the Administrators group.", "C. The file inherits the destination folder's permissions.", "D. Members of the Everyone group will have full access to the file."],
        correct: 2
    },
    {
        id: 32, type: "dragdrop", 
        text: "In which sequence should you complete the actions? Move all the actions to the answer area and place them in the correct sequence.",
        sources: [
            "Reinstall the OS and applications from the original media.",
            "Update everything, including the OS, applications, and anti-virus/anti-malware tools.",
            "Restore the user data from the backup image.",
            "Reformat the disk.",
            "Back up the entire system."
        ],
        targets: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
        correct: [4, 3, 0, 1, 2]
    },
    {
        id: 33, type: "single", text: "What is the first step when conducting a physical security audit?",
        options: ["A. Inventory the company's technology assets", "B. Set up the system logs to audit security events.", "C. Set up a virus quarantine area.", "D. Install auditing software on your servers."],
        correct: 0
    },
    {
        id: 34, type: "single", text: "Which technology examines packet header information to determine whether network traffic is allowed to enter the internal network?",
        options: ["A. Dedicated firewall", "B. RADIUS server", "C. BitLocker To Go", "D. Antivirus software"],
        correct: 0
    },
    {
        id: 35, type: "multiple", text: "What are two benefits to using an incremental backup solution instead of a differential backup solution? (Choose 2.)",
        options: ["A. Less storage space required", "B. Less time needed to back up data", "C. Less administrative effort", "D. Less time needed to recover data"],
        correct: [0, 1]
    },
    {
        id: 36, type: "matrix", 
        text: "For each statement, select True or False.",
        statements: [
            "IPsec requires network applications to be IPsec aware.",
            "IPsec can encrypt data.",
            "IPsec adds overhead for all network communications for which it is used."
        ],
        options: ["True", "False"],
        correct: [1, 0, 0] // False, True, True
    },
    {
        id: 37, type: "multiple", text: "What are three examples of two-factor authentication? (Choose 3.)",
        options: ["A. A username and a password", "B. A password and a PIN number", "C. A fingerprint and a pattern", "D. A password and a smart card", "E. A PIN number and a debit card"],
        correct: [2, 3, 4]
    },
    {
        id: 38, type: "single", text: "Several employees have downloaded a translation browser extension. What should you do?",
        options: ["A. Disable the browser extension and implement controls to allow only corporate-approved browser extensions.", "B. Make sure the browser extension is set to read-only mode, so it cannot overwrite critical information.", "C. Remove the browser extension because it will perform malicious activities.", "D. Nothing, browser extensions pose no harm to the machine or the user."],
        correct: 0
    },
    {
        id: 39, type: "single", text: "You have an application that uses IPsec to secure communications between an internet client and an internal server. To which network security service must the IPsec client connect?",
        options: ["A. SFTP", "B. VPN", "C. SSH", "D. RADIUS"],
        correct: 1
    },
    {
        id: 40, type: "single", text: "Which type of threat mitigation educates the staff within an organization, explaining what to do, when, why, and by whom?",
        options: ["A. Acceptable Use Policy", "B. Physical Security", "C. Defense in Depth", "D. Policies, Procedures, and Awareness"],
        correct: 3
    }
];