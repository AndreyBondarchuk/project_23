import React, { useState } from "react";
import { faker } from '@faker-js/faker';

const generateRandomCertification = () => {
  const certifications = [
    "G", "PG", "PG-13", "R", "NC-17", "U", "U/A", "A", "S", "AL", "6", "9",
    "12", "12A", "15", "18", "18R", "R18", "R21", "M", "MA15+", "R16", "R18+",
    "X18", "T", "E", "E10+", "EC", "C", "CA", "GP", "M/PG", "TV-Y", "TV-Y7",
    "TV-G", "TV-PG", "TV-14", "TV-MA"
  ];
  return faker.helpers.arrayElement(certifications);
};

const generateRandomRole = () => {
  const roles = [
    "Director", "Producer", "Screenwriter", "Actor", "Actress",
    "Cinematographer", "Film Editor", "Production Designer",
    "Costume Designer", "Music Composer"
  ];
  return faker.helpers.arrayElement(roles);
};

const generateData = () => {
  const titles = [];
  const credits = [];

  for (let i = 1; i <= 100; i++) {
    const title = {
      id: i,
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      release_year: faker.date.past().getFullYear(),
      age_certification: generateRandomCertification(),
      runtime: faker.number.int({ min: 60, max: 180 }),
      genres: faker.lorem.words(3).split(" "),
      production_country: faker.location.countryCode(),
      seasons: faker.datatype.boolean() ? faker.number.int(10) : null,
    };
    titles.push(title);

    const numCredits = faker.number.int({ min: 1, max: 5 });
    for (let j = 1; j <= numCredits; j++) {
      const credit = {
        id: credits.length + 1,
        title_id: i,
        real_name: faker.person.fullName(),
        character_name: faker.lorem.words(),
        role: generateRandomRole(),
      };
      credits.push(credit);
    }
  }

  return { titles, credits };
};

const downloadCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," + data.map(row => Object.values(row).join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DataGenerator = () => {
  const [generatedData, setGeneratedData] = useState(false);

  const handleGenerateData = () => {
    const { titles, credits } = generateData();
    setGeneratedData(true);
    downloadCSV(titles, "titles");
    downloadCSV(credits, "credits");
  };

  return (
    <div>
      <button onClick={handleGenerateData}>Generate Synthetic Data</button>
      {generatedData && <p>Data has been generated and saved as CSV files.</p>}
    </div>
  );
};

export default DataGenerator;
