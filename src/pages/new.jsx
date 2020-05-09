import React from 'react';
import { Link } from 'react-router-dom';

class NewPage extends React.Component {
    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
    }

    async save(form) {
        let recipe = {
            "title": form.title.value.trim(),
            "ingredientsBody": form.ingredients.value.trim(),
            "instructionsBody": form.instructions.value.trim(),
            "meta": {
                "serves": form.serves.value.trim(),
                "duration": (form.duration.value.length && form.duration.value > 0 ? form.duration.value : null),
                "source": (form.source.value.trim().length ? form.source.value.trim() : null),
                "diet": {
                    "meat": form.meat.checked,
                    "fish": form.fish.checked,
                    "vegetarian": form.vegetarian.checked,
                    "vegan": form.vegan.checked
                }
            }
        };
        // TODO smart id

        try {
            const res = await this.props.db.addRecipe(recipe);
            this.props.history.replace(`/recipe/${res.id}`); // Replace to prevent user going back to filled form and submitting it again
        } catch (err) {
            console.error(err);
            alert("Er ging iets mis bij het opslaan.");
        }
    }

    render() {
        return (
            <div>
                <div className="top-action-bar">
                    <div className="top-action-grow">
                        <Link to="/">&#x2039; Overzicht</Link>
                    </div>
                </div>
                <form className="recipe-body" onSubmit={(e) => { e.preventDefault(); this.save(e.target); }}>
                    <div className="recipe-row">
                        <div className="recipe-group-right recipe-group-title">
                            <div className="form-group">
                                <label>Titel</label>
                                <input type="text" name="title" required className="recipe-form-title" />
                            </div>
                            <div className="recipe-form-numbers">
                                <div className="form-group">
                                    <label># personen</label>
                                    <input type="number" name="serves" min="1" required />
                                </div>
                                <div className="form-group">
                                    <label>Bereidingstijd</label>
                                    <input type="number" name="duration" min="0" /> minuten
                            </div>
                            </div>
                            <div className="form-group">
                                <label className="inline-input"><input type="checkbox" name="meat"></input> Vlees</label>
                                <label className="inline-input"><input type="checkbox" name="fish"></input> Vis</label>
                                <label className="inline-input"><input type="checkbox" name="vegetarian"></input> Vegetarisch</label>
                                <label className="inline-input"><input type="checkbox" name="vegan"></input> Vegan</label>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-row">
                        <div className="recipe-group-ingredients">
                            <div className="form-group">
                                <label>Ingrediënten</label>
                                <textarea rows="9" name="ingredients" required ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Origineel</label>
                                <input type="text" name="source" />
                            </div>
                        </div>
                        <div className="recipe-group-right recipe-group-instructions">
                            <div className="form-group">
                                <label>Bereiding</label>
                                <textarea rows="12" name="instructions" required ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-row">
                        <div className="recipe-group-right">
                            <p><button>Opslaan</button></p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPage;