import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Warning } from '../../services/api.service';

@Component({
    selector: 'app-scan',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scan.component.html',
    styleUrl: './scan.component.scss'
})
export class ScanComponent {
    warnings: Warning[] | null = null;
    scanning = false;
    analyzing = false;
    mockText = `INGREDIENTS: WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, SODIUM BENZOATE.`;

    constructor(private api: ApiService) { }

    startScan() {
        this.scanning = true;
        // In a real app, we would access the camera here.
        // For this demo, we simulate a scan delay and then "capture" the mock text.
        setTimeout(() => {
            this.scanning = false;
            this.analyze(this.mockText);
        }, 1500);
    }

    analyze(text: string) {
        this.analyzing = true;
        this.api.analyze(text).subscribe(results => {
            this.warnings = results;
            this.analyzing = false;
        });
    }

    reset() {
        this.warnings = null;
    }
}
