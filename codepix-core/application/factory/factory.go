package factory

import (
	"github.com/jinzhu/gorm"
	"github.com/rafaelb4rros/fullcycle-07/codepix-core/application/usecase"
	"github.com/rafaelb4rros/fullcycle-07/codepix-core/infrastructure/repository"
)

func TransactionUseCaseFactory(database *gorm.DB) usecase.TransactionUseCase {
	pixRepository := repository.PixKeyRepositoryDb{Db: database}
	transactionRepository := repository.TransactionRepositoryDb{Db: database}

	transactionUseCase := usecase.TransactionUseCase{
		TransactionRepository: &transactionRepository,
		PixRepository:         pixRepository,
	}

	return transactionUseCase
}
