Unit of Work:

Maintains a list of objects affected by a business transaction and coordinates the writing of changes.

When a request comes in it's considered a transaction.

Controllers will have the Unit of Work injected into them:

Our unit of work will include our DataContext and through it, direct access to our various repositories and their "GetThings()"-type methods, while providing a "SaveChanges()" function which can be used by all of the various repositories.

