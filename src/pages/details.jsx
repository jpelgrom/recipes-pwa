import React from 'react';
import { Link } from 'react-router-dom';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            loading: true,
            loadFailure: null
        };
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

    async deleteRecipe() {
        if (window.confirm("Zeker weten?")) {
            try {
                if (this.state.recipe == null) {
                    this.getRecipe(); // _id + _rev required, so need object and not just id
                }

                await this.props.db.deleteRecipe(this.state.recipe);
                this.props.history.replace("/"); // Replace to prevent user going back to page with id that no longer exists
            } catch (err) {
                console.error(err);
                alert("Er ging iets mis bij het verwijderen.");
            }
        }
    }

    render() {
        const { recipe } = this.state;

        if (recipe != null) {
            let dietDescriptors = [];
            if (recipe.meta.diet.meat) { dietDescriptors.push("Vlees"); }
            if (recipe.meta.diet.fish) { dietDescriptors.push((dietDescriptors.length > 0 ? "v" : "V") + "is"); }
            if (recipe.meta.diet.vegetarian) { dietDescriptors.push((dietDescriptors.length > 0 ? "v" : "V") + "egetarisch"); }
            if (recipe.meta.diet.vegan) { dietDescriptors.push((dietDescriptors.length > 0 ? "v" : "V") + "egan"); }
            let source = null;
            if (recipe.meta.source) {
                if (recipe.meta.source.startsWith("http")) {
                    source = <><h4><a href={recipe.meta.source}>Origineel <span role="img" aria-label="Externe link">🔗</span></a></h4></>;
                } else {
                    source = <><h4>Origineel</h4><div>{recipe.meta.source}</div></>;
                }
            }

            return (
                <div>
                    <div className="top-action-bar">
                        <div className="top-action-grow">
                            <Link to="/">&#x2039; Overzicht</Link>
                        </div>
                        <div>
                            <Link to={`/recipe/${this.props.match.params.id}/edit`} >Bewerken</Link>
                            &nbsp;
                            <button onClick={(e) => { e.preventDefault(); this.deleteRecipe(); }}>Verwijderen</button>
                        </div>
                    </div>
                    <div className="recipe-body">
                        <div className="recipe-row">
                            <div className="recipe-group-right recipe-group-title">
                                <h2>{recipe.title}</h2>
                                <div>{recipe.meta.serves} {recipe.meta.serves > 1 ? "personen" : "persoon"}
                                    {recipe.meta.duration ? ` \u00b7 ${recipe.meta.duration} ${recipe.meta.duration === 1 ? "minuut" : "minuten"}` : null}
                                    {dietDescriptors.length > 0 ? ` \u00b7 ${dietDescriptors.join(", ")}` : null}</div>
                            </div>
                        </div>
                        <div className="recipe-row">
                            <div className="recipe-group-ingredients">
                                <h4>Ingrediënten</h4>
                                <div className="recipe-textarea-body">{recipe.ingredientsBody}</div>
                                {source}
                            </div>
                            <div className="recipe-group-right recipe-group-instructions">
                                <h4>Bereiding</h4>
                                <div className="recipe-textarea-body">{recipe.instructionsBody}</div>
                            </div>
                        </div>

                    </div>
                </div >
            )
        } else if (this.state.loading) {
            return (<div></div>)
        } else {
            // TODO depending on error
            return (<div>Probleem bij laden</div>)
        }
    }
}

export default DetailsPage;