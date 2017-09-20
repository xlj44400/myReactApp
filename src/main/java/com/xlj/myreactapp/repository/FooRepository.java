package com.xlj.myreactapp.repository;

import com.xlj.myreactapp.domain.Foo;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Foo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FooRepository extends MongoRepository<Foo, String> {

}
