import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Ingredient } from '../../services/api.service';

@Component({
    selector: 'app-avoid-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './avoid-list.component.html',
    styleUrl: './avoid-list.component.scss'
})
export class AvoidListComponent implements OnInit {
    ingredients: Ingredient[] = [];
    newIngredientName = '';

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loadPreferences();
    }

    loadPreferences() {
        this.api.getPreferences().subscribe(data => this.ingredients = data);
    }

    add() {
        if (!this.newIngredientName.trim()) return;
        this.api.addPreference(this.newIngredientName).subscribe(() => {
            this.newIngredientName = '';
            this.loadPreferences();
        });
    }

    remove(id: string) {
        this.api.removePreference(id).subscribe(() => {
            this.loadPreferences();
        });
    }
}
