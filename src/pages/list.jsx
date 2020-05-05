import React from 'react';
import Recipecard from '../components/recipecard';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            loading: true,
            loadFailure: null
        };
    }

    componentDidMount() {
        this.getRecipes();
    }

    async getRecipes() {
        const { db } = this.props;

        let stateUpdate = { recipes: [] };
        try {
            const allRecipes = await db.getRecipes();
            allRecipes.rows.forEach((row) => stateUpdate.recipes.push(row.doc));
        } catch (err) {
            console.error(err);
            stateUpdate.loadFailure = err;
        }

        this.setState({
            ...stateUpdate,
            loading: false
        });
    }

    render() {
        return (
            <div>
                <div className="top-action-bar pull-right">
                    <Link to="/new">+ Nieuw recept</Link>
                </div>
                {this.state.recipes.map(recipe => (
                    <Recipecard recipe={recipe} key={recipe._id} />
                ))}
            </div>
        );
    }
}

export default ListPage;