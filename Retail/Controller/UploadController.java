package com.retail.Retail.Controller;

import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UploadController {

    private static final String UPLOAD_DIR = "C:/Users/saipa/OneDrive/Desktop/pavan/reatil-pdf/";

    @PostMapping("/uploads")
    public ResponseEntity<String> handleUpload(
            @RequestParam("name") String name,
            @RequestParam("pdf1") MultipartFile pdf1,
            @RequestParam("pdf2") MultipartFile pdf2,
            @RequestParam("pdf3") MultipartFile pdf3
    ) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            pdf1.transferTo(new File(UPLOAD_DIR + name + "_1.pdf"));
            pdf2.transferTo(new File(UPLOAD_DIR + name + "_2.pdf"));
            pdf3.transferTo(new File(UPLOAD_DIR + name + "_3.pdf"));

            return ResponseEntity.ok("Upload successful!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed!");
        }
    }

    @PostMapping("/merge")
    public ResponseEntity<byte[]> mergePDFs(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            File file1 = new File(UPLOAD_DIR + name + "_1.pdf");
            File file2 = new File(UPLOAD_DIR + name + "_2.pdf");
            File file3 = new File(UPLOAD_DIR + name + "_3.pdf");

            if (!file1.exists() || !file2.exists() || !file3.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            PDFMergerUtility merger = new PDFMergerUtility();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            merger.addSource(file1);
            merger.addSource(file2);
            merger.addSource(file3);
            merger.setDestinationStream(outputStream);
            merger.mergeDocuments(null);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.attachment().filename(name + "_merged.pdf").build());

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/uploads")
    public ResponseEntity<List<Map<String, String>>> listUploads() {
        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            File[] files = dir.listFiles((d, name) -> name.endsWith(".pdf"));
            if (files == null || files.length == 0) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            // Extract unique names (before _1.pdf, _2.pdf, _3.pdf)
            Set<String> uniqueNames = Arrays.stream(files)
                    .map(File::getName)
                    .filter(name -> name.contains("_"))
                    .map(name -> name.substring(0, name.lastIndexOf("_")))
                    .collect(Collectors.toSet());

            // Convert to list of map for frontend compatibility
            List<Map<String, String>> result = uniqueNames.stream()
                    .map(n -> Collections.singletonMap("name", n))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
