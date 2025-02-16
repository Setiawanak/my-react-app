import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

const SignPad = ({ signer, onSave }) => {
  const canvasRef = useRef(null);
  const signaturePad = useRef(null);

  useEffect(() => {
    signaturePad.current = new SignaturePad(canvasRef.current);
    return () => signaturePad.current.off();
  }, []);

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
        <button type="button" style={{ marginRight: "8px" }}>
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