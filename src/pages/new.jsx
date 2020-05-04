import React from 'react';

class NewPage extends React.Component {

    async save() {
        console.error("Not yet implemented");
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => { e.preventDefault(); this.save(); }}>
                    <div className="form-group">
                        <label>Titel</label>
                        <input type="text" name="title" />
                    </div>
                    <div className="form-group">
                        <label>Ingrediënten</label>
                        <textarea rows="8" name="ingredients"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Bereiding</label>
                        <textarea rows="8" name="instructions"></textarea>
                    </div>
                    <div className="form-group">
                        <label># personen</label>
                        <input type="number" name="serves" />
                    </div>
                    <div className="form-group">
                        <label>Bereidingstijd</label>
                        <input type="number" name="duration" /> minuten
                    </div>
                    <div className="form-group">
                        <label className="inline-input"><input type="checkbox" name="meat"></input> Vlees</label>
                        <label className="inline-input"><input type="checkbox" name="fish"></input> Vis</label>
                        <label className="inline-input"><input type="checkbox" name="vegetarian"></input> Vegetarisch</label>
                        <label className="inline-input"><input type="checkbox" name="vegan"></input> Vegan</label>
                    </div>
                    <div className="form-group">
                        <label>Origineel/bron</label>
                        <input type="text" name="source" />
                    </div>
                    <button>Opslaan</button>
                </form>
            </div>
        )
    }
}

export default NewPage;