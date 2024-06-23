import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

config()

const configService = new ConfigService()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
}

const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()
export default dataSource
