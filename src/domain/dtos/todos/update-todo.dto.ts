


export class UpdateTodoDto {
    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    // Props que queremos para hacer el update
    get values() {
        const returnObj: {[ key: string ]: any} = {};

        if ( this.text ) returnObj.text = this.text;
        if ( this.completedAt ) returnObj.completedAt = this.completedAt;

        return returnObj;
    };



    // Validamos los datos antes de devolver la instancia con la data
    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if ( !id || isNaN( Number(id)) ) {
            return [ 'Id must be a valid number' ]
        }

        if (completedAt) {
            newCompletedAt = new Date(completedAt);

            if (newCompletedAt.toString() === 'Invalid Data') {
                return ['CompletedAt must be a valid date', undefined]
            }
        }

        return [undefined, new UpdateTodoDto( id, text, newCompletedAt )];
    }
};