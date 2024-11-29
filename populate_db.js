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

// Realistic Nepali first names and last names (common names in Nepal)
const nepaliFirstNames = [
    'Sanjay', 'Pooja', 'Rajesh', 'Anjali', 'Sita', 'Hari', 'Maya', 'Suman', 'Niraj', 'Rita',
    'Bishal', 'Pramila', 'Deepak', 'Kriti', 'Shyam', 'Sanjita', 'Kamal', 'Ramesh', 'Gita', 'Manish'
];

const nepaliLastNames = [
    'Shrestha', 'Rai', 'Bhandari', 'Tamang', 'Adhikari', 'Joshi', 'Chaudhary', 'Kunwar', 'Pokhrel', 'Bhattarai',
    'Khadka', 'Gautam', 'Neupane', 'Thapa', 'Sapkota', 'Lama', 'Magar', 'Karki', 'Bista', 'Subedi'
];

// Realistic Nepali district and address format
const districts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Biratnagar', 'Dhangadhi', 'Butwal', 'Hetauda', 'Janakpur'];
const tolenames = [
    'Mahalaxmisthan', 'Banasthali', 'Baluwatar', 'Jhamsikhel', 'Patan', 'Thapathali', 'Bagbazar', 'Boudha', 'Chabahil', 'Swayambhu',
    'Kalimati', 'Pashupati', 'Tahachal', 'Naya Baneshwor', 'Newroad', 'Baneshwor', 'Putalisadak', 'Lajimpat', 'Bhrikuti Mandap', 'Durbarmarg'
];

// Realistic Case Types found in Nepali hospitals
const caseTypes = ['General Surgery', 'Maternity', 'Orthopedics', 'Cardiology', 'Emergency', 'Pediatrics', 'Gynecology', 'ENT', 'Nephrology'];

// Realistic Medical Case Names for common diseases
const medicalCases = [
    'Pneumonia', 'Appendicitis', 'Heart Failure', 'Osteoarthritis', 'Chronic Bronchitis', 'Stroke', 'Diabetes Type 2',
    'Hypertension', 'Malaria', 'Tuberculosis', 'Acute Myocardial Infarction (Heart Attack)', 'Asthma', 'Liver Cirrhosis',
    'Parkinson’s Disease', 'Chronic Kidney Disease', 'Cervical Cancer', 'Gastric Ulcer', 'Anemia', 'Hepatitis', 'Epilepsy'
];

// Realistic Nepali Hospital Names
const hospitalNames = [
    'Shree Harsha Hospital', 'Kantipur Hospital', 'Grande International Hospital',
    'Patan Hospital', 'Om Hospital', 'B&B Hospital',
    'Hams Hospital', 'Star Hospital'
];

async function insertData() {
    await client.connect();
    
    const batchSize = 100;  // Number of records per batch
    const totalRecords = 1000;  // Total number of records to insert

    for (let i = 0; i < totalRecords; i += batchSize) {
        const queries = [];

        for (let j = 0; j < batchSize; j++) {
            // Generate random data for each field
            const firstName = faker.helpers.arrayElement(nepaliFirstNames);
            const lastName = faker.helpers.arrayElement(nepaliLastNames);
            const fullName = `${firstName} ${lastName}`;
            const docCode = faker.number.int({ min: 100, max: 999 });
            const docDept = faker.helpers.arrayElement(['Medicine', 'Surgery', 'Orthopedics', 'Pediatrics', 'Dermatology']);
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
            const caseDept = faker.helpers.arrayElement(['Orthopedics', 'Pediatrics', 'Surgery', 'Gynecology']);
            const hospitalName = faker.helpers.arrayElement(hospitalNames);
            const hospitalAddress = `${hospitalName}, ${district}, Nepal`;

            // Construct the SQL query for inserting the data
            const query = `
                INSERT INTO tlbPatient (
                    DOC_NAME, DOC_CODE, DOC_DEPART, HospitalCode, PAT_Sex, PAT_Address, PAT_Age, CaseType, CaseCode, CaseName, CaseDepart, HOS_NAME, HOS_Address
                ) VALUES (
                    '${fullName}', ${docCode}, '${docDept}', ${companyCode}, '${sex}', '${address}', ${age}, '${caseType}', ${caseCode}, '${caseName}', '${caseDept}', '${hospitalName}', '${hospitalAddress}'
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
