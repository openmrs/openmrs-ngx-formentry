import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service'; // Import the FileUploadService

@Component({
  selector: 'app-diagram-embed',
  templateUrl: './diagram-embed.component.html',
  styleUrls: ['./diagram-embed.component.css']
})
export class DiagramEmbedComponent {
  diagramUrl: string;

  constructor(private fileUploadService: FileUploadService) {}

  // This method is called when a diagram file is uploaded
  onDiagramUpload(event: any) {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      // Upload the file and get the URL
      this.fileUploadService.uploadDiagram(file).subscribe((url: string) => {
        this.diagramUrl = url; // Set the diagramUrl property
      });
    }
  }
}
