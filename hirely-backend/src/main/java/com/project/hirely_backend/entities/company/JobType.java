package com.project.hirely_backend.entities.company;


import com.fasterxml.jackson.annotation.JsonCreator;

public enum JobType {
    FULL_TIME,
    PART_TIME,
    INTERNSHIP,
    CONTRACT;

    //
    @JsonCreator
    public static JobType fromValue(String value) {
        return JobType.valueOf(value.toUpperCase());
    }

    }
