import React, { useState, Fragment } from "react";
import SignatureCanvas from "./components/SignaturePad";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import './App.css';
import dummy from "./example.json";

const App = () => {
  const [formData, setFormData] = useState({
    question1: { answer: "", remarks: "" },
    // Tambahkan state untuk pertanyaan lainnya
  });

  console.log(dummy);

  const handleInputChange = (question, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [question]: { ...prev[question], [field]: value },
    }));
  };

  const generatePDF = async () => {
    const input = document.getElementById("form-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("audit-report.pdf");
  };

  return (
    <div className="wrapper">
      <div className="a4-container" style={{ position: "relative" }}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h1 style={{marginBottom: "10px"}}>CHECKLIST AUDIT VISIT REPORT</h1>
        </div>

        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" style={{ width: "100px", position: "absolute", top: "10px", right: "10px" }} />

        <div style={{display: "flex"}}>
          <div style={{width: "50%"}}>
            <div>
              <label>Nama:</label>
              <input type="text" />
            </div>
            <div>
              <label>Hari/Tanggal:</label>
              <input type="date" />
            </div>
          </div>

          <div style={{width: "50%"}}>
          <div>
              <label>Auditor:</label>
              <input type="text" />
            </div>
            <div>
              <label>Auditee:</label>
              <input type="text" />
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <div style={{ margin: "20px 0" }}>
          {dummy.question_categories.map(category => (
            <Fragment>  
              <h4>{category.order}. {category.category_name}</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Pertanyaan</th>
                    <th>Y</th>
                    <th>N</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {category.questions.map((question, index) => (
                    <tr>
                      <td style={{textAlign: "center"}}>{index + 1}</td>
                      <td>{question.question}</td>
                      <td style={{textAlign: "center"}}>
                        <input type="checkbox" />
                      </td>
                      <td style={{textAlign: "center"}}>
                        <input type="checkbox" />
                      </td>
                      <td style={{textAlign: "center"}}>
                        <input type="text" style={{width: "calc(100% - 15px)"}} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fragment>
          ))}
        </div>

        {/* Tanda Tangan */}
        <div style={{ display: "flex", width:"100%", padding: "0 20px", gap: "20px", justifyContent: "space-around", overflowX: "auto" }}>
          {dummy.signer.map(signer => (<SignatureCanvas signer={signer} />))}
        </div>

        <button
          onClick={generatePDF}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}

export default App;