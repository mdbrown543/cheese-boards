const {sequelize} = require('./db');
const {Board, Cheese, User} = require('./index')

describe('Board, Cheese, & User Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create & update a Board, Cheese, & User', async () => {
        
        const board = await Board.create({type: "Party", description:"Fun"});
        const brie = await Cheese.create({type: "brei", description:"Light"});
        const bo = await User.create({name: "Bo Crow", email: "bocrow@gmail.com"});
        await board.set({rating: 6});
        await board.save()
        await brie.set({type:"Brie"});
        await brie.save()
        await bo.set({email:"bocrow111@gmail.com"});
        await bo.save()
        console.log(bo)
        console.log(board)
        console.log(brie)

        expect(board.rating).toBe(6);
        expect(brie.type).toBe('Brie');
        expect(bo.email).toBe('bocrow111@gmail.com');
    })

    test('a User can have multiple Boards', async () => {
    
    const brie = await Cheese.create({type: "Brie", description:"Light"});
    const bo = await User.create({name: "Bo Crow", email: "bocrow@gmail.com"});

    const board = await Board.create({type: "Party", description:"Fun"});
    const board2 = await Board.create({type: "Business", description:"Not Fun"});
    
    await bo.addBoards(board)
    await bo.addBoards(board2)

    const boards = await bo.getBoards() 
    expect(boards[1].description).toBe("Not Fun")
    expect(boards[1] instanceof Board).toBeTruthy
    })

    test('can add cheeses to boards and vice versa', async () => {
        
        const brie = await Cheese.create({type: "Brie", description:"Light"});
        const cheddar = await Cheese.create({type: "Cheddar", description:"Sharp"});
    
        const board = await Board.create({type: "Party", description:"Fun"});
        const board2 = await Board.create({type: "Business", description:"Not Fun"});
		
        await board.addCheese(brie)
		await cheddar.addBoard(board)
        await board2.addCheese(cheddar)
        const cheeseBoard = await Board.findByPk(1)
        await cheeseBoard.addCheese(1)
        const cheddarCheese = await Cheese.findByPk(1)
        await cheddarCheese.addBoard(1)
        const boardCheese = await cheeseBoard.getCheeses()
        const cheddarBoard = await cheddarCheese.getBoards()
        
        expect(cheddarBoard[0].type).toBe('Party');
        expect(boardCheese[0].type).toBe('Brie');

        const newCheese = await Board.findAll({
            include: [
              { model: Cheese, required: true }
            ]
          });
    
        expect(newCheese[0] instanceof Board).toBe(true);
        
      
    })

})
  