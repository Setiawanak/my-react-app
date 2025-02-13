import React, { useState } from "react";
import SignatureCanvas from "./components/SignaturePad";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function App() {
  const [formData, setFormData] = useState({
    question1: { answer: "", remarks: "" },
    // Tambahkan state untuk pertanyaan lainnya
  });

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
    <div className="App" style={{ padding: "20px" }}>
      <div id="form-content">
        <h1>CHECKLIST AUDIT VISIT REPORT</h1>

        {/* Section 1 */}
        <div style={{ margin: "20px 0" }}>
          <h2>Lokasi</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td>1.1</td>
                <td>Petugas mengucapkan Greeting</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleInputChange(
                        "question1",
                        "answer",
                        e.target.checked ? "Y" : "N"
                      )
                    }
                  />{" "}
                  Y
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleInputChange(
                        "question1",
                        "answer",
                        e.target.checked ? "N" : "Y"
                      )
                    }
                  />{" "}
                  N
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange("question1", "remarks", e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
              {/* Tambahkan baris lainnya */}
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <div>
            <h4>Auditor</h4>
            <SignatureCanvas />
          </div>
          {/* Tambahkan 3 signature lainnya */}
        </div>
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
  );
}
