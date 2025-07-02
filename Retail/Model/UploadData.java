package com.retail.Retail.Model;

import jakarta.persistence.*;
//import java.util.Arrays;

@Entity
@Table(name = "upload_data")
public class UploadData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private byte[] pdf1;

    @Lob
    private byte[] pdf2;

    @Lob
    private byte[] pdf3;

    // Optional: Store file names or types
    private String pdf1Name;
    private String pdf2Name;
    private String pdf3Name;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public byte[] getPdf1() {
		return pdf1;
	}
	public void setPdf1(byte[] pdf1) {
		this.pdf1 = pdf1;
	}
	public byte[] getPdf2() {
		return pdf2;
	}
	public void setPdf2(byte[] pdf2) {
		this.pdf2 = pdf2;
	}
	public byte[] getPdf3() {
		return pdf3;
	}
	public void setPdf3(byte[] pdf3) {
		this.pdf3 = pdf3;
	}
	public String getPdf1Name() {
		return pdf1Name;
	}
	public void setPdf1Name(String pdf1Name) {
		this.pdf1Name = pdf1Name;
	}
	public String getPdf2Name() {
		return pdf2Name;
	}
	public void setPdf2Name(String pdf2Name) {
		this.pdf2Name = pdf2Name;
	}
	public String getPdf3Name() {
		return pdf3Name;
	}
	public void setPdf3Name(String pdf3Name) {
		this.pdf3Name = pdf3Name;
	}
    
    
}
