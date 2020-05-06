import React from 'react';
import Recipecard from '../components/recipecard';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: 'az',
            recipes: [],
            loading: true,
            loadFailure: null
        };

        this.setSorting = this.setSorting.bind(this);
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
            stateUpdate.recipes = this.sortList(this.state.sort, stateUpdate.recipes);
        } catch (err) {
            console.error(err);
            stateUpdate.loadFailure = err;
        }

        this.setState({
            ...stateUpdate,
            loading: false
        });
    }

    setSorting(e) {
        let stateUpdate = { sort: e.target.value };
        if (!this.state.loading) {
            stateUpdate.recipes = this.sortList(stateUpdate.sort, this.state.recipes);
        } // else on load finish, list will be sorted
        this.setState(stateUpdate);
    }

    sortList(sort, items) {
        return items.sort((a, b) => {
            const key = (sort === "az" || sort === "za" ? "title" : "updatedAt");
            if (sort === "az" || sort === "date-asc") {
                return a[key].localeCompare(b[key]);
            } else if (sort === "za" || sort === "date-desc") {
                return b[key].localeCompare(a[key]);
            }
            return 0;
        });
    }

    render() {
        return (
            <div>
                <div className="top-action-bar">
                    <div className="top-action-grow">
                        <select value={this.state.sort} onChange={this.setSorting}>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                            <option value="date-desc">Nieuw-oud</option>
                            <option value="date-asc">Oud-nieuw</option>
                        </select>
                    </div>
                    <div className="pull-right">
                        <Link to="/new">+ Nieuw recept</Link>
                    </div>
                </div>
                {this.state.recipes.map(recipe => (
                    <Recipecard recipe={recipe} key={recipe._id} />
                ))}
            </div>
        );
    }
}

export default ListPage;