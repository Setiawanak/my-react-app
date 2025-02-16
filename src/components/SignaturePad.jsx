import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignPad = ({ signer, signData, onSave }) => {
  const canvasRef = useRef(null);
  const signaturePad = useRef(null);

  useEffect(() => {
    signaturePad.current = new SignaturePad(canvasRef.current);
    
    console.log(signer.sign_data);
    if (signer.sign_data) {
      signaturePad.current.fromData(signer.sign_data);
    }

    return () => signaturePad.current.off();
  }, [signer]);

  const handleSave = () => {
    console.log({test: signaturePad.current.toData()});
  }

  const clear = () => signaturePad.current.clear();

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "8px", border: "1px solid #000" }}>
      <div style={{ marginBottom: "8px", textAlign: "center" }}>{signer.role}</div>

      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        style={{ marginBottom: "8px", border: "1px solid #999" }}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="button" onClick={handleSave} style={{ marginRight: "8px" }}>
          Save
        </button>

        <button type="button" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default SignPad;