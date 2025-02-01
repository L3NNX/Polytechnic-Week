export default function StudentUnionTable() {
    const students = [
      {
        id: 1,
        portfolio: "Vice President",
        name: "Sri Biraj Sanaton",
        rollNo: "DHE/22/EL/014",
        semesterBranch: "5th/EL",
      },
      {
        id: 2,
        portfolio: "General Secretary",
        name: "Sri Nayan Madhab Gogoi",
        rollNo: "2300704",
        semesterBranch: "3rd/CV",
      },
      {
        id: 3,
        portfolio: "Assistant General Secretary",
        name: "Miss Angarika Neog",
        rollNo: "2300673",
        semesterBranch: "3rd/CV",
      },
      {
        id: 4,
        portfolio: "Cultural Secretary",
        name: "Sri Rohit Chawra",
        rollNo: "2302107",
        semesterBranch: "3rd/EL",
      },
      {
        id: 5,
        portfolio: "Assistant Cultural Secretary",
        name: "Sri Samujjal Gogoi",
        rollNo: "24000271",
        semesterBranch: "1st/EL",
      },
      {
        id: 6,
        portfolio: "Major Games Secretary",
        name: "Sri Ankit Gogoi",
        rollNo: "2303254",
        semesterBranch: "3rd/ME",
      },
      {
        id: 7,
        portfolio: "Assistant Major Games Secretary",
        name: "Miss Phardina Daimary",
        rollNo: "2300708",
        semesterBranch: "3rd/CV",
      },
      {
        id: 8,
        portfolio: "Minor Games Secretary",
        name: "Sri Jubaraj Borah",
        rollNo: "2300691",
        semesterBranch: "3rd/CV",
      },
      {
        id: 9,
        portfolio: "Assistant Minor Games Secretary",
        name: "Miss Jyotishmita Gogoi",
        rollNo: "2303273",
        semesterBranch: "3rd/ME",
      },
      {
        id: 10,
        portfolio: "Magazine Secretary",
        name: "Sri Deborshi Baruah",
        rollNo: "2302073",
        semesterBranch: "3rd/EL",
      },
      {
        id: 11,
        portfolio: "Assistant Magazine Secretary",
        name: "Miss Chitralekha Sonowal",
        rollNo: "2302071",
        semesterBranch: "3rd/EL",
      },
      {
        id: 12,
        portfolio: "Social Service Secretary",
        name: "Miss Kasturi Dutta",
        rollNo: "2302094",
        semesterBranch: "3rd/EL",
      },
      {
        id: 13,
        portfolio: "Assistant Social Service Secretary",
        name: "Miss Namrata Baruah",
        rollNo: "2300702",
        semesterBranch: "3rd/CV",
      },
      {
        id: 14,
        portfolio: "Boys Common Room Secretary",
        name: "Md. Syed Somir Ahmed",
        rollNo: "2302110",
        semesterBranch: "3rd/EL",
      },
      {
        id: 15,
        portfolio: "Girls Common Room Secretary",
        name: "Miss Bandana Das",
        rollNo: "2300677",
        semesterBranch: "3rd/CV",
      },
    ]
  
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-xl text-center mb-6 leading-relaxed">
          The following students has been selected as mentioned against their portfolios for the session 2024-25 of
          Dhemaji Polytechnic Students Union (DPSU) for running the student union of the Institute.
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SL No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name of the portfolio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name of Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Roll Nos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Semester / Branch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.portfolio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.semesterBranch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  