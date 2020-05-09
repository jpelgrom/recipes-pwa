import React from 'react';
import { Link } from 'react-router-dom';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            loading: true,
            loadFailure: null
        };

        this.save = this.save.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    componentDidMount() {
        this.getRecipe();
    }

    async getRecipe() {
        const { db } = this.props;
        const recipeId = this.props.match.params.id;

        let stateUpdate = {};
        try {
            const recipe = await db.getRecipeById(recipeId);
            console.log("received: ", recipe);
            stateUpdate.recipe = recipe;
        } catch (err) {
            console.error(err);
            stateUpdate.loadFailure = err;
        }

        this.setState({
            ...stateUpdate,
            loading: false
        });
    }

    async save(form) {
        let recipe = {
            "_id": this.state.recipe._id,
            "_rev": this.state.recipe._rev,
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
            },
            "createdAt": this.state.recipe.createdAt
        };

        try {
            await this.props.db.updateRecipe(recipe);
            this.props.history.goBack();
        } catch (err) {
            console.error(err);
            alert("Er ging iets mis bij het opslaan.");
        }
    }

    async deleteRecipe() {
        if (window.confirm("Zeker weten?")) {
            try {
                if (this.state.recipe == null) {
                    this.getRecipe(); // _id + _rev required, so need object and not just id
                }

                await this.props.db.deleteRecipe(this.state.recipe);
                this.props.history.push("/");
            } catch (err) {
                console.error(err);
                alert("Er ging iets mis bij het verwijderen.");
            }
        }
    }

    render() {
        const { recipe } = this.state;

        if (recipe != null) {
            return (
                <div>
                    <div className="top-action-bar">
                        <div className="top-action-grow">
                            <Link to={`/recipe/${this.state.recipe._id}`}>&#x2039; Annuleren</Link>
                        </div>
                        <div>
                            <button onClick={(e) => { e.preventDefault(); this.deleteRecipe(); }}>Verwijderen</button>
                        </div>
                    </div>
                    <form className="recipe-body" onSubmit={(e) => { e.preventDefault(); this.save(e.target); }}>
                        <div className="recipe-row">
                            <div className="recipe-group-right recipe-group-title">
                                <div className="form-group">
                                    <label>Titel</label>
                                    <input type="text" name="title" defaultValue={recipe.title} required className="recipe-form-title" />
                                </div>
                                <div className="recipe-form-numbers">
                                    <div className="form-group">
                                        <label># personen</label>
                                        <input type="number" name="serves" defaultValue={recipe.meta.serves} min="1" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Bereidingstijd</label>
                                        <input type="number" name="duration" defaultValue={recipe.meta.duration} min="0" /> minuten
                            </div>
                                </div>
                                <div className="form-group">
                                    <label className="inline-input"><input type="checkbox" name="meat" defaultChecked={recipe.meta.diet.meat}></input> Vlees</label>
                                    <label className="inline-input"><input type="checkbox" name="fish" defaultChecked={recipe.meta.diet.fish}></input> Vis</label>
                                    <label className="inline-input"><input type="checkbox" name="vegetarian" defaultChecked={recipe.meta.diet.vegetarian}></input> Vegetarisch</label>
                                    <label className="inline-input"><input type="checkbox" name="vegan" defaultChecked={recipe.meta.diet.vegan}></input> Vegan</label>
                                </div>
                            </div>
                        </div>
                        <div className="recipe-row">
                            <div className="recipe-group-ingredients">
                                <div className="form-group">
                                    <label>Ingrediënten</label>
                                    <textarea rows="9" name="ingredients" defaultValue={recipe.ingredientsBody} required ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Origineel</label>
                                    <input type="text" name="source" defaultValue={recipe.meta.source} />
                                </div>
                            </div>
                            <div className="recipe-group-right recipe-group-instructions">
                                <div className="form-group">
                                    <label>Bereiding</label>
                                    <textarea rows="12" name="instructions" defaultValue={recipe.instructionsBody} required ></textarea>
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
        } else if (this.state.loading) {
            return (<div></div>)
        } else {
            // TODO depending on error
            return (<div>Probleem bij laden</div>)
        }
    }
}

export default EditPage;