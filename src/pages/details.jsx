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
                    <h2>{recipe.title}</h2>
                    <div>{recipe.ingredientsBody}</div>
                    <div>{recipe.instructionsBody}</div>
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