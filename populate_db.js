const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

// Database connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: 'postgres',
    port: 5432,
});

// Define the date range for the timestamp
const startDate = new Date('2024-10-19T12:00:00');
const endDate = new Date('2024-11-29T23:59:59');

// Helper function to generate a random timestamp between the start and end date in Nepal Time Zone
function generateRandomTimestamp() {
    // Ensure the dates are valid
    if (startDate instanceof Date && endDate instanceof Date) {
        // Generate a random date between the start and end date
        const randomDate = faker.date.between({
            from: startDate,
            to: endDate
        });

        // Convert to Nepal time zone (UTC +5:45)
        const nepalOffsetMillis = 5 * 60 * 60 * 1000 + 45 * 60 * 1000; // UTC +5:45 in milliseconds
        const nepalTime = new Date(randomDate.getTime() + nepalOffsetMillis);

        return nepalTime.toISOString(); // Format it as an ISO string
    } else {
        throw new Error('Invalid date range');
    }
}

// Realistic Nepali first names and last names (common names in Nepal)
const nepaliFirstNames = [
    'Sanjay', 'Pooja', 'Rajesh', 'Anjali', 'Sita', 'Hari', 'Maya', 'Suman', 'Niraj', 'Rita',
    'Bishal', 'Pramila', 'Deepak', 'Kriti', 'Shyam', 'Sanjita', 'Kamal', 'Ramesh', 'Gita', 'Manish',
    'Sita', 'Gita', 'Sarita', 'Sushil', 'Sujata', 'Santosh', 'Sunita', 'Rajendra', 'Ananyana'
];

const nepaliLastNames = [
    'Shrestha', 'Rai', 'Bhandari', 'Tamang', 'Adhikari', 'Joshi', 'Chaudhary', 'Kunwar', 'Pokhrel', 'Bhattarai', 'Upadhyay', 'Gurung', 'Ghale', 'Pandey', 'Gyawali', 'Gautam', 'Dhakal', 'Khadka', 'Gautam', 'Neupane', 'Thapa', 'Sapkota', 'Lama', 'Magar', 'Karki', 'Bista', 'Subedi', 'Rana'
];

// Realistic Nepali district and address format
const districts = [
    'Achham', 'Arghakhanchi', 'Baglung', 'Baitadi', 'Bajhang', 'Bajura', 'Banke', 'Bara', 'Bardiya', 'Bhaktapur', 'Bhojpur', 
    'Chitwan', 'Dadeldhura', 'Dailekh', 'Dang', 'Darchula', 'Dhading', 'Dhankuta', 'Dhanusha', 'Dolakha', 'Dolpa', 'Doti', 
    'Gorkha', 'Gulmi', 'Humla', 'Ilam', 'Jajarkot', 'Jhapa', 'Jumla', 'Kailali', 'Kalikot', 'Kanchanpur', 'Kapilvastu', 'Kaski', 
    'Kathmandu', 'Kavrepalanchok', 'Khotang', 'Lalitpur', 'Lamjung', 'Mahottari', 'Makwanpur', 'Manang', 'Morang', 'Mugu', 
    'Mustang', 'Myagdi', 'Nawalpur', 'Nuwakot', 'Okhaldhunga', 'Palpa', 'Panchthar', 'Parbat', 'Parsa', 'Pyuthan', 'Ramechhap', 
    'Rasuwa', 'Rautahat', 'Rolpa', 'Rukum East', 'Rukum West', 'Rupandehi', 'Salyan', 'Sankhuwasabha', 'Saptari', 'Sarlahi', 
    'Sindhuli', 'Sindhupalchok', 'Siraha', 'Solukhumbu', 'Sunsari', 'Surkhet', 'Syangja', 'Tanahun', 'Taplejung', 'Terhathum', 
    'Udayapur'
];
const tolenames = [
    'Bhojpur Bazaar', 'Hile Bazaar', 'Shree Antu', 'Kankai', 'Halesi Tuwachung', 'Mills Area', 'Manakamana', 'Ranigaun',
    'Hedangna', 'Namche Bazaar', 'Barahachhetra', 'Taplejung', 'Myanglung', 'Gaighat', 'Gadhimai', 'Janaki Chowk', 'Jaleshwor',
    'Adarsh Nagar', 'Garuda', 'Malangawa', 'Siraha', 'Durbar Square', 'Dhunche', 'Dolakha Bazaar', 'Swayambhu', 'Namobuddha', 
    'Chitlang', 'Nuwakot Durbar', 'Manthali', 'Dhunche', 'Kamalamai', 'Tatopani', 'Baglung', 'Gorkha Bazaar', 'Lakeside', 'Besisahar',
    'Tatopani', 'Devchuli', 'Kushma', 'Syangja', 'Bandipur', 'Sandhikharka', 'Nepalgunj', 'Thakurbaba', 'Ghorahi', 'Resunga', 'Tilaurakot', 
    'Tansen', 'Swargadwari', 'Rolpa', 'Lumbini', 'Dullu', 'Shey Phoksundo', 'Simikot', 'Jajarkot', 'Kalikot', 
    'Sitalpati', 'Birendranagar', 'Chaurjahari', 'Ramaroshan', 'Dasharathchanda', 'Khaptad', 'Budinanda', 'Amargadhi', 'Api Nampa',
    'Dipayal', 'Silgadhi', 'Tikapur', 'Shuklaphanta', 'Balkumari', 'Gaur', 'Jaleshwor', 'Janakpur', 'Dhanusha', 'Birgunj', 'Kalaiya',
    'Barahathawa', 'Hetauda Bazar', 'Bharatpur', 'Tandi', 'Ratnanagar', 'Sauraha', 'Lamahi', 'Ghorahi', 'Tulsipur', 'Bhalubang', 'Ghorahi',
    'Orali', 'Thakuradwara', 'Dhangadhi', 'Mahendranagar', 'Bhimdatta', 'Dadeldhura', 'Dipayal', 'Doti', 'Dhangadhi', 'Kailali', 'Dhangadhi',
    'Bikashnagar', 'Fultekra', 'Dhamboji', 'Butwal', 'Tilottama', 'Siddharthanagar', 'Bhairahawa', 'Taulihawa', 'Kapilvastu', 'Taulihawa',
    'Bastipur', 'School Road', 'Congress Chowk', 'Janaki Chowk', 'Chauki Tol', 'Jhilimili Tol', 'Hetauda Industrial Area', 'Shivaghat', 'Fulbari',
    'Traffic Chowk', 'MMC Road', 'Bhrikuti Chowk', 'Nagarpalika Road', 'Bhutandevi Mandir', 'Bhimad', 'Bhrikutimandap', 'Kamaladi', 'Kantipath'
];


// Realistic Case Types found in Nepali hospitals
const caseTypes = [
    'General Surgery', 'Maternity', 'Orthopedics', 'Cardiology', 'Emergency', 'Pediatrics', 'Gynecology', 'ENT', 'Nephrology',
    'Dermatology', 'Urology', 'Neurology', 'Oncology', 'Psychiatry', 'Pulmonology', 'Gastroenterology', 'Rheumatology', 'Hematology',
    'Endocrinology', 'Ophthalmology', 'Dentistry', 'Plastic Surgery', 'Anesthesiology', 'Radiology', 'Pathology', 'Hepatology', 
    'Immunology', 'Infectious Diseases', 'Chiropractic', 'Nutrition', 'Sports Medicine', 'Palliative Care', 'Rehabilitation', 
    'Emergency Medicine', 'Family Medicine', 'Geriatrics', 'Sleep Medicine', 'Pain Management', 'Addiction Medicine', 'Vascular Surgery', 
    'Traumatology', 'Obstetrics', 'Neonatology', 'Bariatric Surgery', 'Audiology', 'Toxicology', 'Forensic Medicine', 'Plastic Surgery', 
    'Molecular Medicine', 'Geriatric Psychiatry', 'Fertility Medicine'
];


// Realistic Medical Case Names for common diseases
const medicalCases = [
    'Pneumonia', 'Appendicitis', 'Heart Failure', 'Osteoarthritis', 'Chronic Bronchitis', 'Stroke', 'Diabetes Type 2',
    'Hypertension', 'Malaria', 'Tuberculosis', 'Acute Myocardial Infarction (Heart Attack)', 'Asthma', 'Liver Cirrhosis',
    'Parkinson’s Disease', 'Chronic Kidney Disease', 'Cervical Cancer', 'Gastric Ulcer', 'Anemia', 'Hepatitis', 'Epilepsy',
    'Urinary Tract Infection (UTI)', 'Gallstones', 'Hypothyroidism', 'Hyperthyroidism', 'Cystic Fibrosis', 'Chronic Fatigue Syndrome',
    'Alzheimer’s Disease', 'Acid Reflux (GERD)', 'Chronic Sinusitis', 'Psoriasis', 'Multiple Sclerosis', 'Sleep Apnea', 'Atrial Fibrillation',
    'Sickle Cell Anemia', 'Rheumatoid Arthritis', 'Lung Cancer', 'Breast Cancer', 'Prostate Cancer', 'Leukemia', 'Gout', 'Cholesterol Imbalance',
    'Schizophrenia', 'Depression', 'Bipolar Disorder', 'Anxiety Disorder', 'Obesity', 'Osteoporosis', 'Kidney Stones', 'Pelvic Inflammatory Disease',
    'Tonsillitis', 'Endometriosis', 'Menstrual Disorders', 'Incontinence', 'HIV/AIDS', 'Hepatitis B', 'Hepatitis C', 'Meningitis', 'Tubal Ligation',
    'Dengue Fever', 'Chikungunya', 'Zika Virus', 'Leptospirosis', 'Yellow Fever', 'Viral Hemorrhagic Fever', 'West Nile Virus', 'Scrub Typhus'
];


// Realistic Nepali Hospital Names
const hospitalNames = [
    'Shree Harsha Hospital', 'Kantipur Hospital', 'Grande International Hospital', 
    'Patan Hospital', 'Om Hospital', 'B&B Hospital', 
    'Hams Hospital', 'Star Hospital', 'Shree Harsha Hospital', 'National Hospital', 
    'Tribhuvan University Teaching Hospital', 'Siddhartha Hospital', 'Maternity Hospital', 
    'Shree Harsha Hospital', 'Kanti Childrens Hospital', 'Nepal Cancer Hospital', 
    'Sanjivani Hospital', 'Care Hospital', 'Apex Hospital', 
    'Shree Harsha Hospital', 'Bhaktapur Cancer Hospital', 'Shree Harsha Hospital', 
    'Shree Harsha Hospital', 'Star Hospital', 'Kathmandu Medical College Teaching Hospital', 
    'Medical College Teaching Hospital', 'Nepal Medical College', 'Manmohan Memorial Medical College', 
    'Chhetrapati Hospital', 'Narayani Hospital', 'Zikri Hospital', 
    'Medical Care Centre', 'St. Xavier Hospital', 'Sashwat Hospital', 'Heatauda Teaching Hospital', 'Bir Hospital', 'Biratnagar Hospital', 'Grande Hospital'
];

const departments = [
    'Medicine', 'Surgery', 'Orthopedics', 'Pediatrics', 'Dermatology', 
    'Cardiology', 'Neurology', 'Gynecology', 'Psychiatry', 'Endocrinology', 
    'Urology', 'Ophthalmology', 'Dentistry', 'Gastroenterology', 'Pulmonology', 
    'Nephrology', 'Hematology', 'Rheumatology', 'Infectious Diseases', 'Palliative Care', 
    'Radiology', 'Anesthesiology', 'Pathology', 'Rehabilitation', 'Sports Medicine', 
    'Family Medicine', 'Emergency Medicine', 'Geriatrics', 'Plastic Surgery', 'Vascular Surgery', 
    'Bariatric Surgery', 'Chiropractic', 'Nutrition', 'Toxicology', 'Forensic Medicine', 
    'Addiction Medicine', 'Immunology', 'Molecular Medicine', 'Fertility Medicine', 'Sleep Medicine', 
    'Traumatology', 'Oncology', 'Reproductive Medicine', 'Audiology', 'Occupational Medicine'
];

const status = [
    'Admitted', 'Discharged', 'Pending', 'Cancelled', 'Completed', 'In Progress', 'Scheduled', 'Rescheduled', 'Postponed', 'No Show'
]

async function insertData() {
    await client.connect();
    
    const batchSize = 1000;  // Number of records per batch
    const totalRecords = 100000;  // Total number of records to insert

    for (let i = 0; i < totalRecords; i += batchSize) {
        const queries = [];

        for (let j = 0; j < batchSize; j++) {
            // Generate random data for each field
            const firstName = faker.helpers.arrayElement(nepaliFirstNames);
            const lastName = faker.helpers.arrayElement(nepaliLastNames);
            const fullName = `${firstName} ${lastName}`;
            const docCode = faker.number.int({ min: 100, max: 999 });
            const docDept = faker.helpers.arrayElement(departments);
            const companyCode = faker.number.int({ min: 10000, max: 99999 });
            const sex = faker.helpers.arrayElement(['Male', 'Female']);
            const district = faker.helpers.arrayElement(districts);
            const tolename = faker.helpers.arrayElement(tolenames);
            const addressNumber = faker.number.int({ min: 1, max: 20 });
            const address = `${tolename}-${addressNumber}, ${district}`;
            const age = faker.number.int({ min: 18, max: 90 });
            const caseType = faker.helpers.arrayElement(caseTypes);
            const caseCode = faker.number.int({ min: 1000, max: 9999 });
            const caseName = faker.helpers.arrayElement(medicalCases);
            const caseDept = faker.helpers.arrayElement(departments);
            const hospitalName = faker.helpers.arrayElement(hospitalNames);
            const hospitalAddress = `${hospitalName}, ${district}, Nepal`;
            const caseStatus = faker.helpers.arrayElement(status);
            const timestamp = generateRandomTimestamp();

            // Construct the SQL query for inserting the data
            const query = `
                INSERT INTO tbl_Patient (
                    DOC_NAME, DOC_CODE, DOC_DEPART, Hospital_Code, PAT_Sex, PAT_Address, PAT_Age, Case_Type, Case_Code, Case_Name, Case_Depart, HOS_NAME, HOS_Address, Case_Status, Timestamp
                ) VALUES (
                    '${fullName}', ${docCode}, '${docDept}', ${companyCode}, '${sex}', '${address}', ${age}, '${caseType}', ${caseCode}, '${caseName}', '${caseDept}', '${hospitalName}', '${hospitalAddress}', '${caseStatus}', '${timestamp}'
                );
            `;
            queries.push(query);
        }

        // Execute all queries in the current batch
        await client.query(queries.join('\n'));
    }

    console.log('Data insertion complete.');
    await client.end();
}

// Run the data insertion function
insertData().catch(error => {
    console.error('Error inserting data:', error);
    client.end();
});
